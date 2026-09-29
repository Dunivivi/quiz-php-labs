import { Injectable, inject } from '@angular/core';
import { SHEETS_WEBAPP_URL, SHEET_TAB } from '../config';
import { findLab } from '../data/labs';
import { QuizResult } from '../models/quiz';
import { collectDevice, deviceColumns } from '../utils/device';
import { QuizService } from './quiz.service';

/**
 * Trimite rezultatul în Google Sheets, printr-o aplicație Google Apps Script
 * (vezi google-apps-script/Code.gs). Nu avem backend propriu: Apps Script rulează
 * gratuit în contul Google al profesorului și scrie un rând nou în tabel.
 */
@Injectable({ providedIn: 'root' })
export class SheetsService {
  private readonly quiz = inject(QuizService);

  readonly enabled = SHEETS_WEBAPP_URL.trim().length > 0;

  async send(result: QuizResult): Promise<boolean> {
    if (!this.enabled) {
      this.quiz.setSync(result.id, 'disabled');
      return false;
    }

    this.quiz.setSync(result.id, 'pending');
    const lab = findLab(result.labId);
    const device = await collectDevice();
    const payload = {
      sheet: SHEET_TAB,
      id: result.id,
      // titlurile coloanelor din tabel (coloanele noi se adaugă automat)
      row: {
        Data: new Date(result.date).toLocaleString('ro-RO'),
        Laborator: lab?.name ?? result.labId,
        Nume: result.nume,
        Prenume: result.prenume,
        Grupa: result.grupa ?? '',
        Încercarea: result.attempt,
        Corecte: `${result.correct}/${result.total}`,
        Nota: result.nota,
        'Durata (sec)': result.durationSec,
        Răspunsuri: result.details,
        Semnale: result.signals ?? '',
        ...deviceColumns(device),
      },
    };

    try {
      // text/plain = „cerere simplă”: browserul nu mai face verificarea CORS preliminară,
      // pe care Apps Script nu o suportă.
      const response = await fetch(SHEETS_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const json = await response.json().catch(() => ({ ok: response.ok }));
      const ok = response.ok && json.ok !== false;
      this.quiz.setSync(result.id, ok ? 'sent' : 'error');
      return ok;
    } catch {
      this.quiz.setSync(result.id, 'error');
      return false;
    }
  }

  /** Retrimite toate rezultatele care nu au ajuns (de ex. lipsea internetul). */
  async retryPending(): Promise<void> {
    if (!this.enabled) return;
    for (const r of this.quiz.history().filter((r) => r.sync === 'error' || r.sync === 'pending')) {
      await this.send(r);
    }
  }
}
