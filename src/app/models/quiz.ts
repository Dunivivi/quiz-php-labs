import { Question, QuestionType } from './question';

/** Un laborator: are setul lui de întrebări (de ex. 100), din care se aleg 10 la fiecare test. */
export interface Lab {
  id: string;
  /** Ex: „Laboratorul 2”. */
  name: string;
  /** Tema laboratorului. */
  title: string;
  description: string;
  /** Temele de curs din care vin întrebările (afișate pe card). */
  topics: string[];
  color: string;
  questions: Question[];
}

export interface Student {
  nume: string;
  prenume: string;
}

/** O întrebare din testul în desfășurare. */
export interface SessionQuestion {
  /** Poziția întrebării în setul laboratorului. */
  index: number;
  type: QuestionType;
  question: string;
  code?: string;
  explanation: string;
  /** theory / analysis: variantele în ordinea afișată și varianta corectă. */
  options?: string[];
  correct?: number;
  /** fill: răspunsurile acceptate. */
  answers?: string[];
  /** Răspunsul elevului: indexul variantei sau textul scris (fill). */
  picked: number | null;
  typed: string | null;
  isCorrect: boolean | null;
}

export interface QuizSession {
  labId: string;
  student: Student;
  questions: SessionQuestion[];
  current: number;
  startedAt: number;
  finishedAt?: number;
}

/** Starea trimiterii rezultatului în Google Sheets. */
export type SyncStatus = 'pending' | 'sent' | 'error' | 'disabled';

/** Rezumatul unui test terminat. */
export interface QuizResult {
  id: string;
  labId: string;
  nume: string;
  prenume: string;
  /** A câta încercare a acestui elev la acest laborator (pe acest dispozitiv). */
  attempt: number;
  total: number;
  correct: number;
  /** Nota pe scala 1–10. */
  nota: number;
  percent: number;
  date: number;
  durationSec: number;
  /** Răspunsurile, pe scurt (pentru Excel / Google Sheets). */
  details: string;
  sync: SyncStatus;
}
