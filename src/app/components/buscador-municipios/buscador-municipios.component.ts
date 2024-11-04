import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-buscador-municipios',
  templateUrl: './buscador-municipios.component.html',
  styleUrl: './buscador-municipios.component.css'
})
export class BuscadorMunicipiosComponent {

  @Output()
  nombre = new EventEmitter<string>;

  @Input()
  valor!: string;

  listaNombres: Set<string> = new Set;

  constructor(private service: GasolineraService) {}

  onChange() {
    this.listaNombres = new Set;
    this.service.getGasolineras().subscribe(res => {

      res.ListaEESSPrecio.forEach(gasolinera => {

        if(gasolinera.Municipio.toLowerCase().includes(this.valor.toLowerCase()) && this.valor != "") {
          this.listaNombres.add(gasolinera.Municipio);
        }
      })
    })
  }

  onClick(nombre: string) {

    this.nombre.emit(nombre);
  }
}
