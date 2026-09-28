import { Lab } from '../models/quiz';
import { LAB2_QUESTIONS } from './lab2.questions';
import { TEMA2_QUESTIONS } from './tema2.questions';
import { TEMA3_QUESTIONS } from './tema3.questions';
import { TEMA4_QUESTIONS } from './tema4.questions';
import { TEMA5_QUESTIONS } from './tema5.questions';

/**
 * Laboratoarele. Fiecare are setul lui de întrebări; la fiecare test se aleg random 10
 * (4 teorie, 3 analiză de cod, 3 completare de cod — vezi TEST_STRUCTURE din config.ts).
 *
 * Pentru un laborator nou: creezi fișierele de întrebări și adaugi un obiect aici.
 */
export const LABS: Lab[] = [
  {
    id: 'lab2',
    name: 'Laboratorul 2',
    title: 'Structurarea unei pagini web în PHP: Header, Body și Footer',
    description:
      'include / require, componente reutilizabile, meniu și carusel + materia temelor 2–5.',
    topics: [
      'Lab 2: Header, Body, Footer',
      'Tema 2: Server-side și XAMPP',
      'Tema 3: Operatori și expresii',
      'Tema 4: Instrucțiuni condiționale',
      'Tema 5: Instrucțiuni repetitive',
    ],
    color: '#4f5b93',
    questions: [
      ...LAB2_QUESTIONS,
      ...TEMA2_QUESTIONS,
      ...TEMA3_QUESTIONS,
      ...TEMA4_QUESTIONS,
      ...TEMA5_QUESTIONS,
    ],
  },
];

export function findLab(id: string): Lab | undefined {
  return LABS.find((l) => l.id === id);
}
