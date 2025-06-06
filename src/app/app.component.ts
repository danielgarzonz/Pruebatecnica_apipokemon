import { Component } from '@angular/core';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonSearchComponent],
  template: `
    <main class="py-4">
      <app-pokemon-search></app-pokemon-search>
    </main>
  `,
  styles: [`
    body {
      background-color:rgb(0, 128, 255);
      padding-top: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'pokemon-app';
}