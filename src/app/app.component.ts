import { Component } from '@angular/core';
import { HeaderComponent } from './sections/header.component';
import { HeroComponent } from './sections/hero.component';
import { AboutComponent } from './sections/about.component';
import { SkillsComponent } from './sections/skills.component';
import { ProjectsComponent } from './sections/projects.component';
import { ContactComponent } from './sections/contact.component';
import { ClosingComponent } from './sections/closing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    ClosingComponent,
  ],
  template: `
    <a class="skip" href="#main">Skip to content</a>
    <app-header />
    <main id="main">
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-contact />
    </main>
    <app-closing />
  `,
})
export class AppComponent {}
