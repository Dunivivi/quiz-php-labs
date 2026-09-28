/** Nota pe scala 1–10: numărul de răspunsuri corecte raportat la 10 (minim 1). */
export function notaFor(correct: number, total: number): number {
  return Math.max(1, Math.round((correct / total) * 10));
}

/** Mesaj și culoare în funcție de notă. */
export function gradeFor(nota: number): { title: string; message: string; color: string } {
  if (nota >= 9) return { title: 'Excelent!', message: 'Ai stăpânit foarte bine materia.', color: 'var(--color-success)' };
  if (nota >= 7) return { title: 'Foarte bine!', message: 'Recitește explicațiile la ce ai greșit.', color: 'var(--color-success)' };
  if (nota >= 5) return { title: 'Promovat', message: 'Ai bazele, mai exersează codul.', color: 'var(--color-warning)' };
  return { title: 'Nepromovat', message: 'Parcurge explicațiile de mai jos și reia materia.', color: 'var(--color-danger)' };
}
