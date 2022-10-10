import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetail } from '../interfaces/pokemon-details.interface';
import { Pokemon, PokemonResponse } from '../interfaces/pokemon-response.interface';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  public pokemonList(): Observable<PokemonResponse> {

    return this.http.get<PokemonResponse>(`${API_BASE_URL}/pokemon/?offset=0&limit=50"`);
  }

  public getPokemon(pokemon:Pokemon) {
    let id = pokemon.url.split('/')[6]
    return this.http.get(`${API_BASE_URL}/pokemon/${id}`);
  }

  public obtenerPokemon(pokemon:Pokemon): Observable<PokemonDetail>{

    let id = pokemon.url.split('/')[6]
    return this.http.get<PokemonDetail>(`${API_BASE_URL}/pokemon/${id}`);


  }




}
