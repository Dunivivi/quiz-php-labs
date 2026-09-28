import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TEST_STRUCTURE } from '../../config';
import { LABS, findLab } from '../../data/labs';
import { Lab } from '../../models/quiz';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly quiz = inject(QuizService);
  private readonly router = inject(Router);

  protected readonly labs = LABS;
  protected readonly structure = TEST_STRUCTURE;
  protected readonly testSize = TEST_STRUCTURE.theory + TEST_STRUCTURE.analysis + TEST_STRUCTURE.fill;

  protected readonly ongoing = computed(() => {
    const s = this.quiz.session();
    if (!s) return null;
    return {
      lab: findLab(s.labId),
      student: s.student,
      current: s.current + 1,
      total: s.questions.length,
    };
  });

  protected best(lab: Lab): number | null {
    const notes = this.quiz.history().filter((r) => r.labId === lab.id).map((r) => r.nota);
    return notes.length ? Math.max(...notes) : null;
  }

  protected count(lab: Lab, type: 'theory' | 'analysis' | 'fill'): number {
    return this.quiz.countByType(lab, type);
  }

  protected resume(): void {
    this.router.navigate(['/test']);
  }

  protected discard(): void {
    this.quiz.quit();
  }
}
