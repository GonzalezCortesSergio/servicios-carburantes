import { Component } from '@angular/core';
import { ComunidadProvincia, Gasolinera } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-gasolineras',
  templateUrl: './gasolineras.component.html',
  styleUrls: ['./gasolineras.component.css']
})
export class GasolinerasComponent {
  municipio = "Gasolineras";  
  codigoPostalSeleccionado!: string;

  municipioSeleccionado!: string;
  carburanteSeleccionado!: string;
  precioFiltrado!: string;
  comunidadProvincia!: ComunidadProvincia;

  gasolinera!: Gasolinera;

  llamadaMunicipio(municipio: string) {
    this.municipio = municipio;
  }

  seleccionarCarburante(carburante: string) {
    this.carburanteSeleccionado = carburante;
  } 

  actualizarPrecio(precio: string) {
    this.precioFiltrado = precio;
  }

  mostrarGasolineraSeleccionada(gasolinera: Gasolinera) {
    this.gasolinera = gasolinera;
  }

  buscarPorCodigoPostal(cp: string) {
    this.codigoPostalSeleccionado = cp;
  }

  buscarPorComPro(comunidadProvincia: ComunidadProvincia){
    this.comunidadProvincia = comunidadProvincia;
  }
}
