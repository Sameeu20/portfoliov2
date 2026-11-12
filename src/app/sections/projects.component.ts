import { Component } from '@angular/core';
import { PROFILE, PROJECTS } from '../data';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="projects" class="projects paint edge" style="--bg: var(--golden)" aria-labelledby="projects-title">
      <div class="wrap">
        <div class="section-head">
          <div data-reveal>
            <p class="label">My work</p>
            <h2 class="poster" id="projects-title">Featured <span class="hl">projects.</span></h2>
          </div>
          <p data-reveal style="--d: 120ms">
            Three builds across travel, retail and fitness. Each one shipped end to end, from component library to deploy.
          </p>
        </div>

        <ul class="grid">
          @for (p of projects; track p.no; let i = $index) {
            <li class="card proj" data-reveal [style.--d.ms]="i * 90">
              <div
                class="art"
                aria-hidden="true"
                [style.--c1]="p.palette[0]"
                [style.--c2]="p.palette[1]"
                [style.--c3]="p.palette[2]"
              >
                <span class="disc"></span>
                <span class="ridge r1"></span>
                <span class="ridge r2"></span>
                <span class="big">{{ p.no }}</span>
              </div>
              <div class="meta">
                <span class="kind">{{ p.kind }}</span>
                <span class="kind">{{ p.stack.length }} tools</span>
              </div>
              <h3 class="ptitle">{{ p.title }}</h3>
              <ul class="tags" aria-label="Tech stack">
                @for (t of p.stack; track t) {
                  <li class="tag">{{ t }}</li>
                }
              </ul>
              <div class="actions">
                <a class="btn ghost sm" [href]="p.github" target="_blank" rel="noopener">
                  <span class="main">GitHub</span>
                </a>
                @if (p.demo) {
                  <a class="link" [href]="p.demo" target="_blank" rel="noopener">Live demo ↗</a>
                }
              </div>
            </li>
          }
        </ul>

        <div class="banner" data-reveal>
          <p class="poster">That was the work. <span class="hl">This is the code.</span></p>
          <a class="btn" [href]="profile.github" target="_blank" rel="noopener">
            <span class="main">Browse GitHub</span>
            <span class="meta">&#64;Sameeu20</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: clamp(16px, 2vw, 28px);
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .proj { display: flex; flex-direction: column; gap: 14px; transition: transform .4s var(--ease-out), box-shadow .4s var(--ease-out); }
    @media (hover: hover) and (prefers-reduced-motion: no-preference) {
      .proj:hover { transform: translateY(-4px) rotate(-.3deg); box-shadow: 0 30px 40px -28px rgba(90, 50, 20, .7); }
      .proj:hover .disc { transform: translateY(-8px); }
    }
    .proj:nth-child(2) { border-radius: 12px 7px 14px 8px / 7px 11px 8px 13px; }
    .proj:nth-child(3) { border-radius: 9px 14px 7px 11px / 13px 8px 11px 7px; }

    .art {
      position: relative;
      aspect-ratio: 16 / 10;
      border-radius: 6px 9px 7px 10px;
      overflow: hidden;
      border: 1px solid var(--rule);
      background: linear-gradient(180deg, var(--c1), var(--c2));
    }
    .art::after {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--grain), var(--impasto);
      opacity: .4;
      mix-blend-mode: multiply;
    }
    .disc {
      position: absolute;
      width: 28%;
      aspect-ratio: 1;
      right: 16%;
      top: 22%;
      border-radius: 50%;
      background: radial-gradient(circle, #fff3c4, var(--sun) 70%, transparent 72%);
      transition: transform .6s var(--ease-out);
    }
    .ridge { position: absolute; left: -10%; right: -10%; border-radius: 50% 50% 0 0; }
    .r1 { bottom: -30%; height: 70%; background: color-mix(in srgb, var(--c3) 55%, var(--c2)); transform: rotate(-4deg); }
    .r2 { bottom: -45%; height: 70%; background: var(--c3); transform: rotate(3deg); }
    .big {
      position: absolute;
      left: 14px;
      bottom: 6px;
      z-index: 1;
      font-family: var(--poster);
      font-weight: 900;
      font-size: 4.2rem;
      line-height: 1;
      color: var(--paper);
      mix-blend-mode: overlay;
    }
    .meta { display: flex; justify-content: space-between; }
    .kind { font-family: var(--mono); font-size: .66rem; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
    .ptitle {
      font-family: var(--poster);
      font-weight: 860;
      font-size: clamp(1.3rem, 1.1rem + .6vw, 1.7rem);
      line-height: 1.02;
      text-transform: uppercase;
      margin: 0;
    }
    .tags { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
    .actions { display: flex; align-items: center; gap: 16px; margin-top: auto; padding-top: 6px; }
    .btn.sm { min-height: 40px; font-size: .9rem; }

    .banner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-top: clamp(56px, 7vw, 96px);
      padding-block: 26px;
      border-block: 1.5px solid var(--rule-strong);
      .poster { font-size: clamp(1.8rem, 1rem + 3vw, 3.4rem); }
    }
  `,
})
export class ProjectsComponent {
  profile = PROFILE;
  projects = PROJECTS;
}
