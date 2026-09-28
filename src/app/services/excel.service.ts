import { Injectable } from '@angular/core';
import { findLab } from '../data/labs';
import { QuizResult, QuizSession } from '../models/quiz';
import { answerText, correctText } from './quiz.service';

const TYPE_LABEL = { theory: 'Teorie', analysis: 'Analiză cod', fill: 'Completare cod' };

/** Export în Excel (.xlsx). Biblioteca SheetJS se încarcă doar când e nevoie. */
@Injectable({ providedIn: 'root' })
export class ExcelService {
  /** Un singur test: foaia „Rezultat” + foaia „Răspunsuri”. */
  async exportResult(result: QuizResult, session: QuizSession | null): Promise<void> {
    const XLSX = await import('xlsx');
    const wb = XLSX.utils.book_new();

    const summary = XLSX.utils.json_to_sheet([summaryRow(result)]);
    summary['!cols'] = [18, 20, 16, 16, 10, 10, 10, 8, 12].map((wch) => ({ wch }));
    XLSX.utils.book_append_sheet(wb, summary, 'Rezultat');

    if (session) {
      const rows = session.questions.map((q, i) => ({
        Nr: i + 1,
        Tip: TYPE_LABEL[q.type],
        Întrebare: q.question,
        'Răspunsul elevului': answerText(q),
        'Răspuns corect': correctText(q),
        Corect: q.isCorrect ? 'Da' : 'Nu',
      }));
      const sheet = XLSX.utils.json_to_sheet(rows);
      sheet['!cols'] = [5, 15, 60, 30, 30, 8].map((wch) => ({ wch }));
      XLSX.utils.book_append_sheet(wb, sheet, 'Răspunsuri');
    }

    const file = `${result.nume}_${result.prenume}_${result.labId}_nota${result.nota}.xlsx`;
    XLSX.writeFile(wb, safe(file));
  }

  /** Toate rezultatele de pe acest dispozitiv, într-un singur tabel. */
  async exportAll(results: QuizResult[]): Promise<void> {
    const XLSX = await import('xlsx');
    const wb = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(results.map(summaryRow));
    sheet['!cols'] = [18, 20, 16, 16, 10, 10, 10, 8, 12].map((wch) => ({ wch }));
    XLSX.utils.book_append_sheet(wb, sheet, 'Rezultate');
    XLSX.writeFile(wb, `rezultate_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
}

function summaryRow(r: QuizResult) {
  return {
    Data: new Date(r.date).toLocaleString('ro-RO'),
    Laborator: findLab(r.labId)?.name ?? r.labId,
    Nume: r.nume,
    Prenume: r.prenume,
    Grupa: r.grupa ?? '',
    Încercarea: r.attempt,
    Corecte: `${r.correct}/${r.total}`,
    Nota: r.nota,
    'Durata (sec)': r.durationSec,
  };
}

function safe(name: string): string {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w.-]+/g, '_');
}
