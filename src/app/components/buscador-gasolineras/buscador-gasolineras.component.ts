import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-buscador-gasolineras',
  templateUrl: './buscador-gasolineras.component.html',
  styleUrls: ['./buscador-gasolineras.component.css']
})
export class BuscadorGasolinerasComponent {

  @Output() nombre = new EventEmitter<string>();

  @Input() valor!: string;

  @Input() titulo!: string;

  gasolinerasFiltradas: Array<{ nombre: string, direccion: string }> = [];

  constructor(private service: GasolineraService) {}

  onChange() {
    this.gasolinerasFiltradas = [];
    this.service.getGasolineras().subscribe(res => {
      res.ListaEESSPrecio.forEach(gasolinera => {
        if (gasolinera.Municipio.toLowerCase().includes(this.valor.toLowerCase()) && this.valor !== "") {
          this.gasolinerasFiltradas.push({
            nombre: gasolinera.Rótulo,
            direccion: gasolinera.Dirección
          });
        }
      });
    });
  }

  onClick() {
    this.nombre.emit(this.valor); 
  }
}
