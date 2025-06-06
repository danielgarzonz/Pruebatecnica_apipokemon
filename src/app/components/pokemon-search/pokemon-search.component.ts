import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent {
  pokemonName: string = '';
  pokemonData: any = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private pokemonService: PokemonService) { }

  searchPokemon(): void {
    if (!this.pokemonName.trim()) return;

    this.isLoading = true;
    this.error = null;
    this.pokemonData = null;

    this.pokemonService.getPokemon(this.pokemonName).subscribe({
      next: (data) => {
        if (data) {
          this.pokemonData = this.transformPokemonData(data);
        } else {
          this.error = 'Pokémon no encontrado';
        }
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error al buscar el Pokémon';
        this.isLoading = false;
      }
    });
  }

  private transformPokemonData(data: any): any {
    return {
      name: data.name,
      species: data.species.name,
      types: data.types.map((t: any) => t.type.name),
      abilities: data.abilities.map((a: any) => a.ability.name),
      stats: data.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat
      })),
      moves: data.moves.map((m: any) => m.move.name).slice(0, 10),
      image: data.sprites.other['official-artwork'].front_default || 
             data.sprites.front_default
    };
  }
}