import { Component, computed, signal } from '@angular/core';
import { SKILLS } from '../data';
import { RevealDirective } from '../reveal.directive';

/** "Not a list. Click a tab." — a live mini-IDE with a sidebar, echoing the interactive demo pattern. */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="skills" class="skills paint edge" style="--bg: var(--noon)" aria-labelledby="skills-title">
      <div class="wrap">
        <div class="section-head">
          <div data-reveal>
            <p class="label">My expertise</p>
            <h2 class="poster" id="skills-title">Technical <span class="hl">skills.</span></h2>
          </div>
          <p data-reveal style="--d: 120ms">
            Four layers of the stack, from the pixels to the pipeline. Pick one from the sidebar.
          </p>
        </div>

        <div class="stage" data-reveal>
          <p class="nudge label" aria-live="polite">
            @if (touched()) { <span class="told">Told you.</span> } @else { Not a list. Click a tab. }
          </p>

          <div class="window">
            <div class="chrome">
              <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="addr">~/sameeu/stack/{{ slug() }}</span>
            </div>

            <div class="body">
              <div class="sidebar" role="tablist" aria-label="Skill groups" aria-orientation="vertical">
                @for (g of groups; track g.name; let i = $index) {
                  <button
                    role="tab"
                    type="button"
                    [id]="'tab-' + i"
                    [attr.aria-selected]="active() === i"
                    [attr.aria-controls]="'panel'"
                    [attr.tabindex]="active() === i ? 0 : -1"
                    [class.on]="active() === i"
                    (click)="select(i)"
                    (keydown)="onKey($event, i)"
                  >
                    <span class="ico" aria-hidden="true">{{ icons[i] }}</span>
                    <span class="nm">{{ g.name }}</span>
                    <span class="ct">{{ g.items.length }}</span>
                  </button>
                }
                <div class="spacer"></div>
                <p class="foot">{{ total }} tools · 4 layers</p>
              </div>

              <div class="panel" id="panel" role="tabpanel" [attr.aria-labelledby]="'tab-' + active()">
                @for (g of [current()]; track g.name) {
                  <div class="page">
                    <p class="crumb">stack / {{ g.name.toLowerCase() }}</p>
                    <h3 class="ptitle">{{ g.name }}</h3>
                    <ul class="chips">
                      @for (s of g.items; track s; let j = $index) {
                        <li [style.--d.ms]="j * 50">
                          <span class="k">{{ (j + 1).toString().padStart(2, '0') }}</span>{{ s }}
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>
            </div>
          </div>
          <div class="grass" aria-hidden="true"></div>
        </div>

        <div class="sr-only"><table>
          <caption>Technical skills by layer</caption>
          <thead><tr><th scope="col">Layer</th><th scope="col">Tools</th></tr></thead>
          <tbody>
            @for (g of groups; track g.name) {
              <tr><th scope="row">{{ g.name }}</th><td>{{ g.items.join(', ') }}</td></tr>
            }
          </tbody>
        </table></div>
      </div>
    </section>
  `,
  styles: `
    .stage { position: relative; max-width: 1080px; margin-inline: auto; }
    .nudge {
      text-align: center;
      color: var(--ink-2);
      min-height: 1.6em;
      .told { color: var(--accent); font-weight: 700; }
    }
    .window {
      position: relative;
      z-index: 1;
      background: #fbf8f2;
      border: 1.5px solid var(--rule-strong);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 40px 60px -40px rgba(60, 40, 20, .6), 0 2px 0 rgba(255,255,255,.6) inset;
    }
    .chrome {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 14px;
      border-bottom: 1px solid var(--rule);
      background: var(--paper-deep);
    }
    .dots { display: flex; gap: 6px; }
    .dots i { width: 11px; height: 11px; border-radius: 50%; background: var(--rule-strong); opacity: .25; }
    .dots i:first-child { background: var(--stamp); opacity: .8; }
    .dots i:nth-child(2) { background: var(--sun); opacity: .9; }
    .dots i:nth-child(3) { background: var(--sage-deep); opacity: .9; }
    .addr {
      flex: 1;
      font-family: var(--mono);
      font-size: .72rem;
      color: var(--ink-2);
      background: #fbf8f2;
      border: 1px solid var(--rule);
      border-radius: 6px;
      padding: 5px 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .body { display: grid; grid-template-columns: 240px 1fr; min-height: 380px; }
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 14px 10px;
      background: linear-gradient(180deg, #8e86c0 0%, #c8a2b6 60%, #e7a9a0 100%);
      color: var(--ink);
      button {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        background: transparent;
        border: 0;
        border-radius: 8px;
        padding: 10px 10px;
        font: inherit;
        font-size: .92rem;
        color: inherit;
        cursor: pointer;
        text-align: left;
        transition: background-color .2s var(--ease-out), transform .16s var(--ease-out);
        &:hover { background: rgba(255,255,255,.25); }
        &:active { transform: scale(.98); }
        &.on { background: rgba(255, 252, 245, .85); box-shadow: 0 1px 3px rgba(40,20,40,.18); font-weight: 600; }
      }
      .ico { font-family: var(--mono); font-size: .7rem; width: 22px; height: 22px; display: grid; place-items: center; border-radius: 5px; background: rgba(22,19,15,.12); }
      .on .ico { background: var(--accent); color: var(--paper); }
      .nm { flex: 1; }
      .ct { font-family: var(--mono); font-size: .68rem; opacity: .65; }
      .spacer { flex: 1; }
      .foot { margin: 0; padding: 8px 10px 0; font-family: var(--mono); font-size: .62rem; letter-spacing: .06em; text-transform: uppercase; opacity: .7; }
    }
    .panel { padding: clamp(20px, 3vw, 40px); }
    .crumb { margin: 0; font-family: var(--mono); font-size: .68rem; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); }
    .ptitle {
      font-family: var(--poster);
      font-weight: 900;
      font-size: var(--t-h3);
      text-transform: uppercase;
      margin: 6px 0 22px;
      line-height: 1;
    }
    .chips {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 10px;
      li {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 14px;
        border: 1px solid var(--rule);
        border-radius: 8px;
        background: var(--card);
        font-weight: 560;
      }
      .k { font-family: var(--mono); font-size: .66rem; color: var(--accent); }
    }
    @media (prefers-reduced-motion: no-preference) {
      .chips li { animation: chip .5s var(--ease-out) both; animation-delay: var(--d); }
      .told { display: inline-block; animation: chip .4s var(--ease-out) both; }
    }
    @keyframes chip { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

    .grass {
      position: relative;
      height: 46px;
      margin: -26px -2% 0;
      border-radius: 0 0 40% 40% / 0 0 100% 100%;
      background:
        repeating-linear-gradient(100deg, transparent 0 5px, rgba(166,185,108,.55) 5px 6px, transparent 6px 11px),
        linear-gradient(180deg, var(--sage-deep), #2f4a34);
      -webkit-mask: radial-gradient(120% 140% at 50% -20%, #000 60%, transparent 61%);
      mask: radial-gradient(120% 140% at 50% -20%, #000 60%, transparent 61%);
    }

    @media (width <= 700px) {
      .body { grid-template-columns: 1fr; }
      .sidebar {
        flex-direction: row;
        overflow-x: auto;
        padding: 10px;
        button { width: auto; flex: none; }
        .spacer, .foot, .ct { display: none; }
      }
      .body { min-height: 0; }
    }
  `,
})
export class SkillsComponent {
  groups = SKILLS;
  icons = ['FE', 'BE', 'DB', 'OP'];
  total = SKILLS.reduce((n, g) => n + g.items.length, 0);
  active = signal(0);
  touched = signal(false);
  current = computed(() => this.groups[this.active()]);
  slug = computed(() => this.current().name.toLowerCase().replace(/[^a-z]+/g, '-'));

  select(i: number): void {
    if (i !== this.active()) this.touched.set(true);
    this.active.set(i);
  }

  onKey(e: KeyboardEvent, i: number): void {
    const n = this.groups.length;
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    this.select(next);
    (document.getElementById('tab-' + next) as HTMLElement | null)?.focus();
  }
}
