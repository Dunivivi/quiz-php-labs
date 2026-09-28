import { GROUPS } from '../data/students';

export interface RosterMatch {
  nume: string;
  prenume: string;
  grupa: string;
}

/** „  Carauş   mihai ” → „caraus mihai” (fără diacritice, cratime, spații în plus, litere mici). */
export function normalizeName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diacritice: ă â î ș ş ț ţ → a a i s s t t
    .toLowerCase()
    .replace(/[-‐–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Caută elevul în lista grupelor. Acceptă și numele inversate (prenumele în câmpul „Nume”).
 * Întoarce numele scris corect, ca în listă, sau null dacă nu există.
 */
export function findStudent(nume: string, prenume: string): RosterMatch | null {
  const n = normalizeName(nume);
  const p = normalizeName(prenume);
  if (!n || !p) return null;

  for (const group of GROUPS) {
    for (const [sNume, sPrenume] of group.students) {
      const sn = normalizeName(sNume);
      const sp = normalizeName(sPrenume);
      if ((n === sn && p === sp) || (n === sp && p === sn)) {
        return { nume: sNume, prenume: sPrenume, grupa: group.name };
      }
    }
  }
  return null;
}
