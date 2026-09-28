/** Tipul întrebării: teorie, analiza unei secvențe de cod, completarea unei secvențe de cod. */
export type QuestionType = 'theory' | 'analysis' | 'fill';

/** Marcajul locului gol din codul întrebărilor de completare. */
export const BLANK = '____';

export interface Question {
  type: QuestionType;
  /** Textul întrebării. */
  question: string;
  /** Codul afișat. Obligatoriu la „analysis” și „fill”; la „fill” conține exact un BLANK. */
  code?: string;
  /** Variantele de răspuns (4) — doar la „theory” și „analysis”. */
  options?: string[];
  /** Indexul variantei corecte — doar la „theory” și „analysis”. */
  correct?: number;
  /** Răspunsurile acceptate pentru locul gol — doar la „fill”. */
  answers?: string[];
  /** Explicație scurtă, afișată la final. */
  explanation: string;
}
