import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailComponent } from '../dialogs/pokemon-detail/pokemon-detail.component';
import { PokemonDetail } from '../interfaces/pokemon-details.interface';
import { Pokemon } from '../interfaces/pokemon-response.interface';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  listPokemon : Pokemon[] = [];
  detalles : PokemonDetail | undefined;

  constructor(
    private pokemonService : PokemonService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.mostrarPokemon()
  }


  mostrarPokemon(){
    this.pokemonService.pokemonList().subscribe(res => {
      this.listPokemon = res.results
    })
  }

  obtenerImagen(pokemon:Pokemon){
    let id = pokemon.url.split('/')[6]
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  }

  mostrarDetalle (pokemon:Pokemon){
    this.pokemonService.obtenerPokemon(pokemon).subscribe(res => {
      this.detalles = res;
      this.dialog.open(PokemonDetailComponent, {
        width: '250px',
        data: {pokemonInfo : this.detalles},
      });

    })
  }

}
