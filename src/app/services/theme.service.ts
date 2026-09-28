import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';

export type Theme = 'light' | 'dark';

/** Comutare între tema light și dark, salvată în localStorage. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(StorageService);

  readonly theme = signal<Theme>(this.initialTheme());

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    this.storage.set('theme', next);
  }

  private initialTheme(): Theme {
    const saved = this.storage.get<Theme | null>('theme', null);
    if (saved) return saved;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
