import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-buscador-municipios',
  templateUrl: './buscador-municipios.component.html',
  styleUrl: './buscador-municipios.component.css'
})
export class BuscadorMunicipiosComponent implements OnInit{

  @Output()
  nombre = new EventEmitter<string>;

  @Input()
  valor!: string;

  listaNombres: Set<string> = new Set;

  constructor(private service: GasolineraService) {}

  ngOnInit(): void {
      this.service.getGasolineras().subscribe(res => {

        res.ListaEESSPrecio.forEach(gasolinera => {

          this.listaNombres.add(gasolinera.Municipio);
        })
      })
  }

  onChange() {
    this.listaNombres = new Set;
    this.service.getGasolineras().subscribe(res => {

      res.ListaEESSPrecio.forEach(gasolinera => {

        if(gasolinera.Municipio.toLowerCase().includes(this.valor.toLowerCase())) {
          this.listaNombres.add(gasolinera.Municipio);
        }
      })
    })
  }

  onClick(nombre: string) {

    this.nombre.emit(nombre);
  }
}
