import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TEST_STRUCTURE } from '../../config';
import { findLab } from '../../data/labs';
import { QuizService } from '../../services/quiz.service';

/** Doar litere (inclusiv diacritice), spații și cratimă; minim 2 caractere. */
const NAME_PATTERN = /^[\p{L}][\p{L} '-]{1,39}$/u;

@Component({
  selector: 'app-start',
  imports: [FormsModule, RouterLink],
  templateUrl: './start.html',
  styleUrl: './start.scss',
})
export class Start {
  private readonly quiz = inject(QuizService);
  private readonly router = inject(Router);

  /** Parametrul :id din rută (primit automat datorită withComponentInputBinding). */
  readonly id = input.required<string>();

  protected readonly lab = computed(() => findLab(this.id()));
  protected readonly structure = TEST_STRUCTURE;

  protected readonly nume = signal(this.quiz.lastStudent()?.nume ?? '');
  protected readonly prenume = signal(this.quiz.lastStudent()?.prenume ?? '');
  protected readonly submitted = signal(false);

  protected readonly numeValid = computed(() => NAME_PATTERN.test(this.nume().trim()));
  protected readonly prenumeValid = computed(() => NAME_PATTERN.test(this.prenume().trim()));

  protected start(): void {
    this.submitted.set(true);
    const lab = this.lab();
    if (!lab || !this.numeValid() || !this.prenumeValid()) return;

    this.quiz.start(lab.id, { nume: tidy(this.nume()), prenume: tidy(this.prenume()) });
    this.router.navigate(['/test']);
  }
}

/** „ion  popescu” → „Ion Popescu” */
function tidy(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('ro')
    .replace(/(^|[\s-])\p{L}/gu, (m) => m.toLocaleUpperCase('ro'));
}
