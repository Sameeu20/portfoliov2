import { Component } from '@angular/core';
import { PROFILE, SKILLS } from '../data';

@Component({
  selector: 'app-closing',
  standalone: true,
  template: `
    <footer class="closing paint edge dark" style="--bg: var(--twilight)">
      <div class="stars" aria-hidden="true"></div>
      <div class="moon" aria-hidden="true"></div>
      <div class="wrap">
        <p class="label">Full stack, end to end</p>
        <p class="poster big">Build<br /><span class="hl">better.</span></p>
        <p class="lede">Angular to Spring Boot, MongoDB to Google Cloud. Let's ship something solid.</p>
        <div class="ctas">
          <a class="btn" [href]="'mailto:' + profile.email" style="--btn-bg: var(--night-ink); --btn-fg: var(--ink)">
            <span class="main">Hire me</span>
            <span class="meta">Open to work</span>
          </a>
          <a class="btn ghost" [href]="profile.resume" target="_blank" rel="noopener">
            <span class="main">Resume</span>
          </a>
        </div>

        <p class="req">{{ stack }}</p>

        <div class="foot">
          <span>© {{ year }} {{ profile.name }}</span>
          <nav aria-label="Footer">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a [href]="profile.github" target="_blank" rel="noopener">GitHub</a>
            <a [href]="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          </nav>
        </div>
        <p class="signoff poster">Sun's down. Still shipping.</p>
      </div>
    </footer>
  `,
  styles: `
    .closing {
      overflow: hidden;
      background-image: var(--impasto), linear-gradient(180deg, var(--twilight) 0%, var(--evening) 55%, var(--night) 100%);
      padding-bottom: 40px;
    }
    .stars {
      position: absolute;
      inset: 0 0 40% 0;
      background-image:
        radial-gradient(1.5px 1.5px at 12% 20%, #fff8 50%, transparent 51%),
        radial-gradient(1px 1px at 28% 60%, #fff7 50%, transparent 51%),
        radial-gradient(1.5px 1.5px at 46% 14%, #fff9 50%, transparent 51%),
        radial-gradient(1px 1px at 63% 42%, #fff6 50%, transparent 51%),
        radial-gradient(1.5px 1.5px at 78% 26%, #fffa 50%, transparent 51%),
        radial-gradient(1px 1px at 90% 66%, #fff6 50%, transparent 51%),
        radial-gradient(1px 1px at 36% 34%, #fff5 50%, transparent 51%);
      z-index: -1;
    }
    .moon {
      position: absolute;
      right: 10%;
      top: 14%;
      width: clamp(70px, 9vw, 130px);
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(circle at 38% 38%, #fbf3dd, #e9dcbc 60%);
      box-shadow: 0 0 80px rgba(251, 207, 91, .25);
      z-index: -1;
    }
    .big { font-size: var(--t-mega); }
    .lede { color: var(--night-ink-2); }
    .ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
    .btn::before { background: var(--sun); }
    .req {
      margin: 44px 0 0;
      font-family: var(--mono);
      font-size: var(--t-label);
      letter-spacing: .08em;
      text-transform: uppercase;
      color: var(--night-ink-2);
    }
    .foot {
      margin-top: clamp(64px, 8vw, 120px);
      padding-top: 18px;
      border-top: 1px solid var(--night-rule);
      display: flex;
      flex-wrap: wrap;
      gap: 14px 30px;
      justify-content: space-between;
      font-family: var(--mono);
      font-size: .7rem;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--night-ink-2);
      nav { display: flex; flex-wrap: wrap; gap: 8px 20px; }
      a { text-decoration: none; &:hover { color: var(--sun-pale); } }
    }
    .signoff {
      margin-top: 40px;
      font-size: clamp(1.6rem, 1rem + 2.6vw, 3rem);
      color: color-mix(in srgb, var(--night-ink) 30%, transparent);
    }
  `,
})
export class ClosingComponent {
  profile = PROFILE;
  year = new Date().getFullYear();
  stack = SKILLS.flatMap((g) => g.items).join(' · ');
}
