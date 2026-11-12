import { Component, signal } from '@angular/core';
import { PROFILE } from '../data';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="contact" class="contact paint edge" style="--bg: var(--dusk)" aria-labelledby="contact-title">
      <div class="wrap grid">
        <div data-reveal>
          <p class="label">Get in touch</p>
          <h2 class="poster" id="contact-title">Let's<br /><span class="hl">connect.</span></h2>
        </div>

        <div class="side" data-reveal style="--d: 120ms">
          <p class="lede">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try
            my best to get back to you!
          </p>

          <div class="ctas">
            <a class="btn" [href]="'mailto:' + profile.email">
              <span class="main">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18v12H3z"/><path d="m3 7 9 7 9-7"/></svg>
                Send message
              </span>
              <span class="meta">Email</span>
            </a>
            <a class="btn ghost" [href]="profile.linkedin" target="_blank" rel="noopener">
              <span class="main">LinkedIn</span>
            </a>
          </div>

          <dl class="details">
            <div>
              <dt>Email</dt>
              <dd>
                <a class="link" [href]="'mailto:' + profile.email">{{ profile.email }}</a>
                <button type="button" class="copy" (click)="copy()">{{ copied() ? 'Copied' : 'Copy' }}</button>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd><a class="link" [href]="profile.linkedin" target="_blank" rel="noopener">in/abdulsameeu</a></dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd><a class="link" [href]="profile.github" target="_blank" rel="noopener">Sameeu20</a></dd>
            </div>
          </dl>
          <p class="sr-only" aria-live="polite">{{ copied() ? 'Email address copied' : '' }}</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      gap: clamp(32px, 5vw, 80px);
      grid-template-columns: 1fr;
      align-items: end;
      @media (width > 900px) { grid-template-columns: 1fr 1fr; }
    }
    .lede { margin-top: 0; max-width: 40ch; }
    .ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
    .details {
      margin: 36px 0 0;
      border-top: 1px solid var(--rule);
      div {
        display: grid;
        grid-template-columns: 110px 1fr;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid var(--rule);
        align-items: center;
      }
      dt { font-family: var(--mono); font-size: var(--t-label); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-2); }
      dd { margin: 0; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; min-width: 0; word-break: break-all; }
    }
    .copy {
      font-family: var(--mono);
      font-size: .62rem;
      letter-spacing: .08em;
      text-transform: uppercase;
      background: transparent;
      border: 1px solid var(--rule-strong);
      border-radius: 3px;
      padding: 3px 7px;
      cursor: pointer;
      color: inherit;
    }
  `,
})
export class ContactComponent {
  profile = PROFILE;
  copied = signal(false);

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  }
}
