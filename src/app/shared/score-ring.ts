import { Component, computed, input } from '@angular/core';

/** Cerc de progres care afișează un procent (0–100). */
@Component({
  selector: 'app-score-ring',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="52" class="track" />
      <circle
        cx="60"
        cy="60"
        r="52"
        class="value"
        [attr.stroke-dasharray]="circumference"
        [attr.stroke-dashoffset]="offset()"
      />
    </svg>
    <span class="label">
      <strong>{{ label() ?? percent() + '%' }}</strong>
      <ng-content />
    </span>
  `,
  styles: `
    :host {
      position: relative;
      display: inline-grid;
      place-items: center;
    }
    svg {
      transform: rotate(-90deg);
    }
    circle {
      fill: none;
      stroke-width: 10;
    }
    .track {
      stroke: var(--color-surface-2);
    }
    .value {
      stroke: var(--ring-color, var(--color-primary));
      stroke-linecap: round;
      transition: stroke-dashoffset 900ms var(--ease-out);
      animation: draw 900ms var(--ease-out) both;
    }
    .label {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: var(--text-xs);
      color: var(--color-text-muted);
    }
    strong {
      font-size: 2rem;
      line-height: 1.1;
      letter-spacing: -0.04em;
      color: var(--color-text);
    }
    @keyframes draw {
      from {
        stroke-dashoffset: 327;
      }
    }
  `,
})
export class ScoreRing {
  readonly percent = input.required<number>();
  readonly size = input(160);
  /** Textul din mijloc (implicit: procentul). */
  readonly label = input<string | null>(null);

  protected readonly circumference = 2 * Math.PI * 52;
  protected readonly offset = computed(() => this.circumference * (1 - this.percent() / 100));
}
