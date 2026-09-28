import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'QuizLab PHP',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'lab/:id',
    title: 'Începe testul · QuizLab PHP',
    loadComponent: () => import('./pages/start/start').then((m) => m.Start),
  },
  {
    path: 'test',
    title: 'Test în desfășurare · QuizLab PHP',
    loadComponent: () => import('./pages/quiz/quiz').then((m) => m.Quiz),
  },
  {
    path: 'rezultat',
    title: 'Rezultat · QuizLab PHP',
    loadComponent: () => import('./pages/result/result').then((m) => m.Result),
  },
  {
    path: 'rezultate',
    title: 'Rezultate · QuizLab PHP',
    loadComponent: () => import('./pages/results/results').then((m) => m.Results),
  },
  { path: '**', redirectTo: '' },
];
