import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TEST_STRUCTURE } from '../../config';
import { findLab } from '../../data/labs';
import { QuizService } from '../../services/quiz.service';
import { findStudent } from '../../utils/roster';

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

  protected readonly numeValid = computed(() => this.nume().trim().length > 0);
  protected readonly prenumeValid = computed(() => this.prenume().trim().length > 0);
  /** Elevul din lista grupelor (null dacă numele nu se găsește). */
  protected readonly match = computed(() => findStudent(this.nume(), this.prenume()));

  protected start(): void {
    this.submitted.set(true);
    const lab = this.lab();
    const student = this.match();
    if (!lab || !student) return;

    // salvăm numele exact cum e scris în listă (cu diacriticele corecte)
    this.quiz.start(lab.id, student);
    this.router.navigate(['/test']);
  }
}
