import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name.toLowerCase()}`).pipe(
      catchError(error => {
        console.error('Error fetching Pokémon:', error);
        return of(null);
      })
    );
  }
}