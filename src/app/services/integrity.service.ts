import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';

/** Ce s-a întâmplat în timpul testului (se trimite doar în tabelul profesorului). */
interface IntegrityState {
  /** De câte ori a ieșit din pagină (alt tab, altă aplicație, altă fereastră). */
  leaves: number;
  /** Timpul total petrecut în afara paginii. */
  awayMs: number;
  copies: number;
  pastes: number;
  /** Întrebările la care a răspuns imediat după ce a lipsit mai mult timp. */
  afterLeave: number[];
}

const KEY = 'integrity';
/** O absență mai lungă de atât contează la „răspuns imediat după ieșire”. */
const LONG_AWAY_MS = 10_000;
/** „Imediat” = a trecut mai departe în cel mult atâtea milisecunde după revenire. */
const QUICK_ANSWER_MS = 8_000;

const empty = (): IntegrityState => ({ leaves: 0, awayMs: 0, copies: 0, pastes: 0, afterLeave: [] });

/**
 * Semnale despre testul în desfășurare: ieșiri din pagină, copieri, lipiri.
 * Nu sunt dovezi — arată doar la ce teste merită să se uite profesorul.
 */
@Injectable({ providedIn: 'root' })
export class IntegrityService {
  private readonly storage = inject(StorageService);
  private state: IntegrityState = this.storage.get(KEY, empty());

  private awaySince: number | null = null;
  private returnedAt = 0;
  private lastAwayMs = 0;
  private cleanup: (() => void) | null = null;

  /** La începutul unui test nou. */
  reset(): void {
    this.state = empty();
    this.save();
  }

  /** Pornește urmărirea (pe pagina testului). */
  attach(): void {
    this.detach();

    const leave = () => {
      if (this.awaySince !== null) return;
      this.awaySince = Date.now();
      this.state.leaves++;
      this.save();
    };
    const back = () => {
      if (this.awaySince === null) return;
      this.lastAwayMs = Date.now() - this.awaySince;
      this.state.awayMs += this.lastAwayMs;
      this.returnedAt = Date.now();
      this.awaySince = null;
      this.save();
    };
    const visibility = () => (document.hidden ? leave() : back());
    const copy = () => {
      this.state.copies++;
      this.save();
    };
    const paste = () => {
      this.state.pastes++;
      this.save();
    };

    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('blur', leave);
    window.addEventListener('focus', back);
    document.addEventListener('copy', copy);
    document.addEventListener('paste', paste);

    this.cleanup = () => {
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('blur', leave);
      window.removeEventListener('focus', back);
      document.removeEventListener('copy', copy);
      document.removeEventListener('paste', paste);
    };
  }

  detach(): void {
    this.cleanup?.();
    this.cleanup = null;
  }

  /** Se apelează când elevul răspunde la întrebarea cu numărul dat (de la 1). */
  answered(questionNumber: number): void {
    const quick = this.returnedAt > 0 && Date.now() - this.returnedAt <= QUICK_ANSWER_MS;
    if (quick && this.lastAwayMs >= LONG_AWAY_MS && !this.state.afterLeave.includes(questionNumber)) {
      this.state.afterLeave.push(questionNumber);
      this.save();
    }
    this.returnedAt = 0;
  }

  /** Textul pentru coloana „Semnale” din tabel. */
  summary(): string {
    const s = this.state;
    if (!s.leaves && !s.copies && !s.pastes) return 'Fără semnale';

    const parts = [
      `Ieșiri din pagină: ${s.leaves}${s.leaves ? ` (${formatDuration(s.awayMs)})` : ''}`,
      `Copieri: ${s.copies}`,
      `Lipiri: ${s.pastes}`,
    ];
    if (s.afterLeave.length) {
      parts.push(`Răspuns imediat după ieșire: ${s.afterLeave.map((n) => `Î${n}`).join(', ')}`);
    }
    return parts.join(' · ');
  }

  private save(): void {
    this.storage.set(KEY, this.state);
  }
}

function formatDuration(ms: number): string {
  const total = Math.round(ms / 1000);
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return min ? `${min} min ${sec} s` : `${sec} s`;
}
