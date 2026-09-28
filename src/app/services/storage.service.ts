import { Injectable } from '@angular/core';

/**
 * Un mic „wrapper” peste localStorage.
 * - salvează/citește automat JSON
 * - prinde erorile (ex: modul privat al browserului, spațiu plin)
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly prefix = 'quizlab-php.';

  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch {
      // ignorăm: aplicația merge și fără salvare
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch {}
  }
}
