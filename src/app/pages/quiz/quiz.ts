import { Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { findLab } from '../../data/labs';
import { BLANK, QuestionType } from '../../models/question';
import { QuizService } from '../../services/quiz.service';
import { SheetsService } from '../../services/sheets.service';

export const TYPE_LABELS: Record<QuestionType, string> = {
  theory: 'Teorie',
  analysis: 'Analiză de cod',
  fill: 'Completare de cod',
};

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
  host: {
    '(document:keydown)': 'onKey($event)',
  },
})
export class Quiz {
  protected readonly quiz = inject(QuizService);
  private readonly sheets = inject(SheetsService);
  private readonly router = inject(Router);

  protected readonly letters = ['A', 'B', 'C', 'D'];
  protected readonly typeLabels = TYPE_LABELS;
  protected readonly confirmQuit = signal(false);

  protected readonly session = this.quiz.session;
  protected readonly question = this.quiz.currentQuestion;
  protected readonly lab = computed(() => findLab(this.session()?.labId ?? ''));

  private readonly fillInput = viewChild<ElementRef<HTMLInputElement>>('fillInput');

  /** Codul întrebării de completare, împărțit în: înainte de gol / după gol. */
  protected readonly codeParts = computed(() => {
    const code = this.question()?.code ?? '';
    const i = code.indexOf(BLANK);
    return i < 0 ? null : { before: code.slice(0, i), after: code.slice(i + BLANK.length) };
  });

  protected readonly answered = computed(() => {
    const q = this.question();
    if (!q) return false;
    return q.type === 'fill' ? !!q.typed?.trim() : q.picked !== null;
  });

  protected readonly isLast = computed(() => {
    const s = this.session();
    return !!s && s.current === s.questions.length - 1;
  });

  constructor() {
    if (!this.session()) this.router.navigate(['/']);

    // la întrebările de completare, cursorul intră direct în câmpul gol
    effect(() => {
      if (this.question()?.type === 'fill') {
        setTimeout(() => this.fillInput()?.nativeElement.focus());
      }
    });
  }

  protected choose(i: number): void {
    this.quiz.choose(i);
  }

  protected typeAnswer(value: string): void {
    this.quiz.type(value);
  }

  protected next(): void {
    if (!this.answered()) return;
    const result = this.quiz.next();
    if (result) {
      this.sheets.send(result); // trimitem în fundal; pagina de rezultat arată starea
      this.router.navigate(['/rezultat']);
    }
  }

  protected quit(): void {
    this.quiz.quit();
    this.router.navigate(['/']);
  }

  /** Lățimea câmpului gol, după lungimea textului scris. */
  protected inputWidth(): string {
    const len = Math.max(6, (this.question()?.typed ?? '').length + 2);
    return `${Math.min(len, 40)}ch`;
  }

  /** 1–4 / A–D aleg varianta; Enter trece mai departe. */
  protected onKey(event: KeyboardEvent): void {
    const q = this.question();
    if (!q || event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      this.next();
      return;
    }
    if (q.type === 'fill') return; // în câmpul gol, tastele se scriu normal

    const key = event.key.toUpperCase();
    let index = Number(key) - 1;
    if (Number.isNaN(index)) index = this.letters.indexOf(key);
    if (index >= 0 && index < (q.options?.length ?? 0)) {
      event.preventDefault();
      this.choose(index);
    }
  }
}
