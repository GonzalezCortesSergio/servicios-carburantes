import { Component, Input } from '@angular/core';
import { Gasolinera } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {

  @Input()
  gasolinera!: Gasolinera;

  mapsUrl(): string {

    let direccion = this.gasolinera.Direccion

    let direccionSinEspacios = direccion.replaceAll(" ", "%20");
    let direccionSinComas = direccionSinEspacios.replaceAll(",", "%2C");

    return `www.google.com/maps/search/?api=1&query=${direccionSinComas}`;
  }

}
