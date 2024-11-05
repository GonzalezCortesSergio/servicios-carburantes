import { Component, Input } from '@angular/core';
import { ListaEessprecio } from '../../interfaces/gasolinera.interface';

@Component({
  selector: 'app-carburantes',
  templateUrl: './carburantes.component.html',
  styleUrl: './carburantes.component.css'
})
export class CarburantesComponent {

  @Input()
  gasolinera!: ListaEessprecio;

}
