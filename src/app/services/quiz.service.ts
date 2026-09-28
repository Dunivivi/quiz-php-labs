import { Injectable, computed, inject, signal } from '@angular/core';
import { TEST_STRUCTURE } from '../config';
import { findLab } from '../data/labs';
import { QuestionType } from '../models/question';
import { Lab, QuizResult, QuizSession, SessionQuestion, Student, SyncStatus } from '../models/quiz';
import { isFillCorrect } from '../utils/answers';
import { shuffle } from '../utils/shuffle';
import { notaFor } from '../shared/grade';
import { StorageService } from './storage.service';

const SESSION_KEY = 'session';
const LAST_KEY = 'last';
const HISTORY_KEY = 'history';
const SEEN_KEY = 'seen';
const STUDENT_KEY = 'student';

type SeenMap = Record<string, number[]>;

/** Ordinea tipurilor în test: întâi teoria, apoi analiza, apoi completarea. */
const TYPE_ORDER: QuestionType[] = ['theory', 'analysis', 'fill'];

/**
 * Logica testului:
 * - alege 10 întrebări random după structura din config (4 / 3 / 3)
 * - întâi cele nevăzute pe acest dispozitiv, ca două încercări să difere
 * - salvează totul în localStorage (testul poate fi reluat după refresh)
 */
@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly storage = inject(StorageService);

  readonly session = signal<QuizSession | null>(this.storage.get(SESSION_KEY, null));
  readonly lastSession = signal<QuizSession | null>(this.storage.get(LAST_KEY, null));
  readonly history = signal<QuizResult[]>(this.storage.get(HISTORY_KEY, []));
  /** Ultimul nume introdus, ca să nu fie scris din nou. */
  readonly lastStudent = signal<Student | null>(this.storage.get(STUDENT_KEY, null));

  readonly currentQuestion = computed(() => {
    const s = this.session();
    return s ? s.questions[s.current] : null;
  });

  start(labId: string, student: Student): void {
    const lab = findLab(labId);
    if (!lab) return;

    this.lastStudent.set(student);
    this.storage.set(STUDENT_KEY, student);

    const questions = TYPE_ORDER.flatMap((type) =>
      this.pick(lab, type, TEST_STRUCTURE[type]).map((index) => this.toSessionQuestion(lab, index)),
    );

    this.saveSession({
      labId,
      student,
      questions,
      current: 0,
      startedAt: Date.now(),
    });
  }

  /** Răspuns la o întrebare cu variante. */
  choose(optionIndex: number): void {
    this.update((q) => ({ ...q, picked: optionIndex, isCorrect: optionIndex === q.correct }));
  }

  /** Răspuns la o întrebare de completare. */
  type(text: string): void {
    this.update((q) => ({ ...q, typed: text, isCorrect: isFillCorrect(text, q.answers ?? []) }));
  }

  /** Trece la următoarea întrebare. Returnează rezultatul dacă testul s-a terminat. */
  next(): QuizResult | null {
    const s = this.session();
    if (!s) return null;
    if (s.current < s.questions.length - 1) {
      this.saveSession({ ...s, current: s.current + 1 });
      return null;
    }
    return this.finish();
  }

  quit(): void {
    this.saveSession(null);
  }

  setSync(resultId: string, sync: SyncStatus): void {
    const history = this.history().map((r) => (r.id === resultId ? { ...r, sync } : r));
    this.history.set(history);
    this.storage.set(HISTORY_KEY, history);
  }

  clearHistory(): void {
    this.history.set([]);
    this.lastSession.set(null);
    this.storage.remove(HISTORY_KEY);
    this.storage.remove(LAST_KEY);
  }

  countByType(lab: Lab, type: QuestionType): number {
    return lab.questions.filter((q) => q.type === type).length;
  }

  // ------------------------------------------------------------------

  private finish(): QuizResult | null {
    const s = this.session();
    if (!s) return null;

    const finished: QuizSession = { ...s, finishedAt: Date.now() };
    const correct = finished.questions.filter((q) => q.isCorrect).length;
    const total = finished.questions.length;
    const sameStudent = (r: QuizResult) =>
      r.labId === s.labId &&
      r.nume.toLowerCase() === s.student.nume.toLowerCase() &&
      r.prenume.toLowerCase() === s.student.prenume.toLowerCase();

    const result: QuizResult = {
      id: crypto.randomUUID(),
      labId: s.labId,
      nume: s.student.nume,
      prenume: s.student.prenume,
      grupa: s.student.grupa,
      attempt: this.history().filter(sameStudent).length + 1,
      total,
      correct,
      nota: notaFor(correct, total),
      percent: Math.round((correct / total) * 100),
      date: finished.finishedAt!,
      durationSec: Math.round((finished.finishedAt! - s.startedAt) / 1000),
      details: finished.questions
        .map((q, i) => `${i + 1}. ${q.isCorrect ? '✓' : '✗'} ${answerText(q)}`)
        .join(' | '),
      sync: 'pending',
    };

    this.lastSession.set(finished);
    this.storage.set(LAST_KEY, finished);

    const history = [result, ...this.history()].slice(0, 200);
    this.history.set(history);
    this.storage.set(HISTORY_KEY, history);

    this.saveSession(null);
    return result;
  }

  private update(fn: (q: SessionQuestion) => SessionQuestion): void {
    const s = this.session();
    if (!s) return;
    const questions = s.questions.map((q, i) => (i === s.current ? fn(q) : q));
    this.saveSession({ ...s, questions });
  }

  private toSessionQuestion(lab: Lab, index: number): SessionQuestion {
    const q = lab.questions[index];
    const base = {
      index,
      type: q.type,
      question: q.question,
      code: q.code,
      explanation: q.explanation,
      picked: null,
      typed: null,
      isCorrect: null,
    };
    if (q.type === 'fill') {
      return { ...base, answers: q.answers };
    }
    // amestecăm variantele, dar ținem minte unde a ajuns cea corectă
    const order = shuffle(q.options!.map((_, i) => i));
    return { ...base, options: order.map((i) => q.options![i]), correct: order.indexOf(q.correct!) };
  }

  /**
   * Alege `count` întrebări de tipul dat. Cele deja văzute pe acest dispozitiv sunt
   * folosite doar când nu mai sunt destule nevăzute.
   */
  private pick(lab: Lab, type: QuestionType, count: number): number[] {
    const pool = lab.questions.flatMap((q, i) => (q.type === type ? [i] : []));
    const seenMap = this.storage.get<SeenMap>(SEEN_KEY, {});
    const seen = new Set(seenMap[lab.id] ?? []);

    let picked = shuffle(pool.filter((i) => !seen.has(i))).slice(0, count);
    if (picked.length < count) {
      const rest = shuffle(pool.filter((i) => seen.has(i))).slice(0, count - picked.length);
      picked = [...picked, ...rest];
      pool.forEach((i) => seen.delete(i));
    }

    picked.forEach((i) => seen.add(i));
    seenMap[lab.id] = [...seen];
    this.storage.set(SEEN_KEY, seenMap);
    return shuffle(picked);
  }

  private saveSession(session: QuizSession | null): void {
    this.session.set(session);
    if (session) this.storage.set(SESSION_KEY, session);
    else this.storage.remove(SESSION_KEY);
  }
}

/** Răspunsul elevului ca text (pentru Excel / Google Sheets). */
export function answerText(q: SessionQuestion): string {
  if (q.type === 'fill') return q.typed?.trim() || '(fără răspuns)';
  return q.picked !== null && q.options ? q.options[q.picked] : '(fără răspuns)';
}

/** Răspunsul corect ca text. */
export function correctText(q: SessionQuestion): string {
  if (q.type === 'fill') return (q.answers ?? []).join('  sau  ');
  return q.options && q.correct !== undefined ? q.options[q.correct] : '';
}
