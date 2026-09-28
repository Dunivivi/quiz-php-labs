import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SHEET_VIEW_URL } from '../../config';
import { findLab } from '../../data/labs';
import { ExcelService } from '../../services/excel.service';
import { QuizService, answerText, correctText } from '../../services/quiz.service';
import { SheetsService } from '../../services/sheets.service';
import { DurationPipe } from '../../shared/duration.pipe';
import { gradeFor } from '../../shared/grade';
import { ScoreRing } from '../../shared/score-ring';
import { TYPE_LABELS } from '../quiz/quiz';

type Filter = 'all' | 'wrong' | 'correct';

@Component({
  selector: 'app-result',
  imports: [RouterLink, ScoreRing, DurationPipe],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {
  private readonly quiz = inject(QuizService);
  private readonly excel = inject(ExcelService);
  protected readonly sheets = inject(SheetsService);
  private readonly router = inject(Router);

  protected readonly session = this.quiz.lastSession;
  protected readonly lab = computed(() => findLab(this.session()?.labId ?? ''));
  protected readonly typeLabels = TYPE_LABELS;
  protected readonly sheetUrl = SHEET_VIEW_URL;
  protected readonly filter = signal<Filter>('all');
  protected readonly answerText = answerText;
  protected readonly correctText = correctText;

  /** Rezultatul salvat pentru ultimul test (din istoric — are și starea trimiterii). */
  protected readonly result = computed(() => {
    const s = this.session();
    return s ? this.quiz.history().find((r) => r.date === s.finishedAt) ?? null : null;
  });

  protected readonly grade = computed(() => gradeFor(this.result()?.nota ?? 1));

  protected readonly reviewed = computed(() => {
    const qs = (this.session()?.questions ?? []).map((q, i) => ({ ...q, number: i + 1 }));
    const f = this.filter();
    return f === 'all' ? qs : qs.filter((q) => (f === 'correct') === !!q.isCorrect);
  });

  constructor() {
    if (!this.session()) this.router.navigate(['/']);
  }

  protected download(): void {
    const r = this.result();
    if (r) this.excel.exportResult(r, this.session());
  }

  protected resend(): void {
    const r = this.result();
    if (r) this.sheets.send(r);
  }

  protected again(): void {
    const s = this.session();
    if (s) this.router.navigate(['/lab', s.labId]);
  }
}
