import { Component } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';

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
    this.municipioSeleccionado = municipio;
  }

  actualizarCarburante(carburante: string) {
    this.carburanteSeleccionado = carburante;
  }

  actualizarPrecio(precio: string) {
    this.precioFiltrado = precio;
  }

  lasPatate(promotor: string) {

  }

}
