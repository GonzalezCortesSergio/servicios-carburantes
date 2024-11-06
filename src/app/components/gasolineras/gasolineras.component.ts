import { Component } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { Gasolinera } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-gasolineras',
  templateUrl: './gasolineras.component.html',
  styleUrl: './gasolineras.component.css'
})
export class GasolinerasComponent {

  municipio = "Gasolineras"  

  municipioSeleccionado!: string;
  carburanteSeleccionado!: string;
  precioFiltrado!: string;

  llamadaMunicipio(municipio: string) {
    this.municipio = municipio;
  }

  actualizarCarburante(carburante: string) {
    this.carburanteSeleccionado = carburante;
  }

  actualizarPrecio(precio: string) {
    this.precioFiltrado = precio;
  }

  mostrarLista(promotor: string, carburante:string, precio:string) {
    
  }

}
