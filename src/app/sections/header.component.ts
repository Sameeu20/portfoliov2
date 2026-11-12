import { Component, HostListener, signal } from '@angular/core';
import { PROFILE } from '../data';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="bar" [class.snap]="scrolled()" [class.open]="menuOpen()">
      <div class="inner">
        <a class="mark" href="#top" aria-label="Abdul Sameeu, home">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#8e86c0" />
            <circle cx="21" cy="14" r="5" fill="#fbb927" />
            <path d="M0 22 Q9 15 18 21 T32 19 V32 H0Z" fill="#1e5141" />
          </svg>
          <span>sameeu</span>
        </a>

        <nav class="links" id="nav-links" aria-label="Primary">
          @for (l of links; track l.href) {
            <a [href]="l.href" (click)="menuOpen.set(false)">{{ l.label }}</a>
          }
          <a [href]="profile.github" target="_blank" rel="noopener" class="ext">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.88.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
            GitHub
          </a>
          <a [href]="profile.linkedin" target="_blank" rel="noopener" class="ext">LinkedIn</a>
        </nav>

        <button
          class="menu-btn"
          type="button"
          aria-controls="nav-links"
          [attr.aria-expanded]="menuOpen()"
          (click)="menuOpen.set(!menuOpen())"
        >
          {{ menuOpen() ? 'Close' : 'Menu' }}
        </button>
        <a class="bar-cta" [href]="profile.resume" target="_blank" rel="noopener">Resume</a>
      </div>
    </header>
  `,
  styles: `
    .bar {
      position: fixed;
      inset: 0 0 auto 0;
      z-index: 50;
      border-bottom: 1px solid transparent;
      transition: border-color .2s, background-color .3s var(--ease-out);
    }
    .bar.snap {
      background: color-mix(in srgb, var(--paper) 88%, transparent);
      backdrop-filter: blur(10px) saturate(1.2);
      -webkit-backdrop-filter: blur(10px) saturate(1.2);
      border-color: var(--rule);
    }
    .inner {
      max-width: var(--max);
      margin-inline: auto;
      padding: 12px var(--gutter);
      display: flex;
      align-items: center;
      gap: 22px;
    }
    .mark {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      text-decoration: none;
      font-family: var(--poster);
      font-weight: 880;
      font-size: 1.3rem;
      letter-spacing: -0.04em;
      line-height: 1;
      margin-right: auto;
      svg { width: 28px; height: 28px; border-radius: 7px; box-shadow: 0 0 0 1px var(--rule); }
    }
    .links {
      display: flex;
      align-items: center;
      gap: 20px;
      a {
        font-family: var(--mono);
        font-size: .72rem;
        letter-spacing: .05em;
        text-transform: uppercase;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: color .15s;
        &:hover { color: var(--accent); }
      }
      svg { width: 13px; height: 13px; }
    }
    .bar-cta {
      background: var(--ink);
      color: var(--paper);
      border-radius: 3px;
      padding: 9px 14px 8px;
      font-family: var(--poster);
      font-weight: 740;
      font-size: .9rem;
      letter-spacing: .03em;
      text-transform: uppercase;
      text-decoration: none;
      transition: background-color .15s;
      &:hover { background: var(--accent); }
    }
    .menu-btn {
      display: none;
      background: none;
      border: 0;
      color: inherit;
      font-family: var(--mono);
      font-size: .72rem;
      letter-spacing: .06em;
      text-transform: uppercase;
      cursor: pointer;
      padding: 8px 4px;
    }
    @media (width <= 820px) {
      .menu-btn { display: inline-block; }
      .links {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        padding: 6px var(--gutter) 18px;
        background: var(--paper);
        border-bottom: 1px solid var(--rule);
        display: none;
        a { padding: 12px 0; font-size: .82rem; width: 100%; border-bottom: 1px solid var(--rule); }
      }
      .open .links { display: flex; }
      .open { background: var(--paper); }
    }
  `,
})
export class HeaderComponent {
  profile = PROFILE;
  scrolled = signal(false);
  menuOpen = signal(false);
  links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
}
