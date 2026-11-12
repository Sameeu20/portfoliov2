import { Component } from '@angular/core';
import { ABOUT, PRINCIPLES } from '../data';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="about" class="about paint edge" style="--bg: var(--morning)" aria-labelledby="about-title">
      <div class="wrap">
        <div class="section-head">
          <div data-reveal>
            <p class="label">Discover</p>
            <h2 class="poster" id="about-title">About <span class="hl">me.</span></h2>
          </div>
          <div class="copy" data-reveal style="--d: 120ms">
            @for (p of about; track $index) {
              <p>{{ p }}</p>
            }
          </div>
        </div>

        <ol class="principles">
          @for (p of principles; track p.no; let i = $index) {
            <li class="card" data-reveal [style.--d.ms]="i * 80">
              <span class="no">{{ p.no }}</span>
              <h3 class="card-title">{{ p.title }}</h3>
              <p>{{ p.body }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .copy p { margin: 0 0 14px; color: var(--ink-2); }
    .copy p:first-child { color: var(--ink); font-size: var(--t-lede); line-height: 1.4; }
    .principles {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: clamp(14px, 1.6vw, 22px);
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    }
    .card { display: flex; flex-direction: column; gap: 10px; min-height: 210px; }
    .card:nth-child(2) { border-radius: 12px 7px 14px 8px / 7px 11px 8px 13px; }
    .card:nth-child(3) { border-radius: 9px 14px 7px 11px / 13px 8px 11px 7px; }
    .card:nth-child(4) { border-radius: 14px 8px 12px 7px / 8px 13px 7px 11px; }
    .no {
      font-family: var(--poster);
      font-weight: 900;
      font-size: 3.2rem;
      line-height: .9;
      color: var(--accent);
      margin-bottom: auto;
    }
    .card p { margin: 0; color: var(--ink-2); font-size: var(--t-small); }
  `,
})
export class AboutComponent {
  about = ABOUT;
  principles = PRINCIPLES;
}
