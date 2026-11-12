import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { PROFILE, PROJECTS } from '../data';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero" id="top" aria-labelledby="hero-title">
      <!-- Painted sky scene -->
      <div class="scene" aria-hidden="true">
        <div class="sky"></div>
        <div class="bands"></div>
        <div class="sun" data-depth="0.15"></div>
        <svg class="hill far" data-depth="0.3" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0 210 C180 150 320 190 470 170 S760 110 930 150 S1250 120 1440 160 V320 H0Z" />
        </svg>
        <svg class="hill mid" data-depth="0.55" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0 240 C220 200 380 250 600 225 S980 180 1180 215 S1360 230 1440 205 V320 H0Z" />
        </svg>
        <svg class="hill near" data-depth="0.9" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0 270 C260 245 520 285 760 262 S1180 240 1440 262 V320 H0Z" />
        </svg>
        <div class="grain"></div>
      </div>

      <div class="wrap content">
        <p class="label hello">Hello, I'm</p>
        <h1 class="poster title" id="hero-title">
          <span class="line">{{ profile.firstName }}</span>
          <span class="line">{{ profile.lastName }}.</span>
        </h1>
        <p class="lede">
          <strong>{{ profile.role }}.</strong> {{ profile.intro }}
        </p>

        <div class="ctas">
          <a class="btn" href="#projects">
            <span class="main">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              View my work
            </span>
            <span class="meta">{{ projectCount }} projects</span>
          </a>
          <a class="btn soft" [href]="profile.resume" target="_blank" rel="noopener">
            <span class="main">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>
              Resume
            </span>
            <span class="meta">PDF</span>
          </a>
          <a class="link source" [href]="profile.github" target="_blank" rel="noopener">Read my code</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .hero {
      position: relative;
      min-height: max(640px, 100svh);
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-block: 120px 160px;
    }
    .scene { position: absolute; inset: 0; z-index: 0; }
    .scene > * { position: absolute; }
    .sky {
      inset: 0;
      background: linear-gradient(
        180deg,
        #8e86c0 0%,
        #a59ac4 22%,
        #c8a2b6 44%,
        #e7a9a0 60%,
        #f2c48f 72%,
        #f3dcaa 80%
      );
    }
    /* Horizontal brush bands, like a long exposure */
    .bands {
      inset: 0;
      background: repeating-linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.07) 0 2px,
        transparent 2px 5px,
        rgba(60, 40, 80, 0.05) 5px 6px,
        transparent 6px 11px
      );
      mix-blend-mode: soft-light;
    }
    .sun {
      width: clamp(120px, 16vw, 240px);
      aspect-ratio: 1;
      right: 14%;
      top: 48%;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 45%, #fff3c4 0%, var(--sun-pale) 38%, var(--sun) 70%, rgba(251, 185, 39, 0) 72%);
      filter: blur(.5px) drop-shadow(0 0 60px rgba(251, 185, 39, .55));
      transform: translate3d(calc(var(--mx, 0) * var(--k) * 4px), calc(var(--my, 0) * var(--k) * 4px), 0);
    }
    .hill {
      left: -10%;
      width: 120%;
      max-width: none;
      bottom: 0;
      height: 46%;
      transform: translate3d(calc(var(--mx, 0) * var(--k) * 4px), calc(var(--my, 0) * var(--k) * 2px), 0);
    }
    .sun { --k: 2.7; }
    .hill.far { --k: 5.4; }
    .hill.mid { --k: 10; }
    .hill.near { --k: 16; }
    .hill.far path { fill: #b97b8a; opacity: .85; }
    .hill.mid path { fill: var(--sage-deep); }
    .hill.near { height: 34%; }
    .hill.near path { fill: #2f4a34; }
    .grain {
      inset: 0;
      background: var(--grain), var(--impasto);
      opacity: .35;
      mix-blend-mode: multiply;
    }

    .content { position: relative; z-index: 1; }
    .hello { color: var(--ink); opacity: .8; }
    .title {
      font-size: var(--t-mega);
      line-height: .85;
      color: var(--ink);
      text-shadow: 0 1px 0 rgba(255, 245, 230, .35);
    }
    .line { display: block; }
    .lede {
      max-width: 40ch;
      color: var(--ink);
      margin-top: clamp(20px, 2.4vw, 32px);
      strong { font-weight: 640; }
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 14px;
      margin-top: 34px;
    }
    .source {
      font-size: var(--t-small);
      margin-left: 8px;
      color: var(--ink);
    }

    @media (prefers-reduced-motion: no-preference) {
      .sun { animation: rise 2.4s var(--ease-out) both; }
      .line { animation: drop 1s var(--ease-out) both; }
      .line + .line { animation-delay: .08s; }
      .lede, .ctas, .hello { animation: band-in 1s var(--ease-out) .25s both; }
      .hill { transition: transform .8s var(--ease-out); }
      .sun { transition: transform 1s var(--ease-out); }
    }
    @keyframes rise {
      from { top: 75%; opacity: 0; }
      to { top: 48%; opacity: 1; }
    }
    @keyframes drop {
      from { transform: translateY(-0.25em); opacity: 0; }
      to { transform: none; opacity: 1; }
    }
    @keyframes band-in {
      from { transform: translateY(14px); opacity: 0; }
      to { transform: none; opacity: 1; }
    }

    @media (width <= 640px) {
      .hero { align-items: flex-start; padding-top: 110px; }
      .sun { right: -6%; top: 54%; }
      .ctas .btn { width: 100%; justify-content: space-between; }
      .source { margin-left: 0; }
    }
  `,
})
export class HeroComponent {
  profile = PROFILE;
  projectCount = String(PROJECTS.length).padStart(2, '0');
  private host = inject(ElementRef<HTMLElement>);
  private finePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    if (!this.finePointer) return;
    const r = this.host.nativeElement.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    this.host.nativeElement.style.setProperty('--mx', String(-mx));
    this.host.nativeElement.style.setProperty('--my', String(-my));
  }
}
