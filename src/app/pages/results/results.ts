import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SHEET_VIEW_URL } from '../../config';
import { findLab } from '../../data/labs';
import { ExcelService } from '../../services/excel.service';
import { QuizService } from '../../services/quiz.service';
import { SheetsService } from '../../services/sheets.service';
import { DurationPipe } from '../../shared/duration.pipe';

@Component({
  selector: 'app-results',
  imports: [RouterLink, DatePipe, DurationPipe],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  private readonly quiz = inject(QuizService);
  private readonly excel = inject(ExcelService);
  protected readonly sheets = inject(SheetsService);

  protected readonly history = this.quiz.history;
  protected readonly findLab = findLab;
  protected readonly sheetUrl = SHEET_VIEW_URL;
  protected readonly confirmClear = signal(false);

  protected readonly unsent = computed(
    () => this.history().filter((r) => r.sync === 'error' || r.sync === 'pending').length,
  );

  protected exportAll(): void {
    this.excel.exportAll(this.history());
  }

  protected retry(): void {
    this.sheets.retryPending();
  }

  protected clear(): void {
    this.quiz.clearHistory();
    this.confirmClear.set(false);
  }

  protected notaClass(nota: number): string {
    if (nota >= 7) return 'badge--success';
    if (nota >= 5) return 'badge--warning';
    return 'badge--danger';
  }
}
