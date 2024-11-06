import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { BuscadorMunicipiosComponent } from '../../components/buscador-municipios/buscador-municipios.component'
import { Gasolinera } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-buscador-gasolineras',
  templateUrl: './buscador-gasolineras.component.html',
  styleUrls: ['./buscador-gasolineras.component.css']
})
export class BuscadorGasolinerasComponent {

  @Input() titulo!: string;

  @Input() municipio!: string;
  @Input() carburanteSeleccionado!: string;
  @Output() gasolineraSeleccionada = new EventEmitter<Gasolinera>();

  tiposCarburantes = ['Gasóleo', 'Gasolina', 'Hidrógeno'];
  gasolinerasFiltradas: Gasolinera[] = [];

  carburante!: string;

  constructor(private service: GasolineraService) {}

  obtenerGasolinerasPorMunicipio(municipio: string) {
    this.gasolinerasFiltradas = [];
    this.service.getGasolineras().subscribe(( res) => {
      res.ListaEESSPrecio.forEach((gasolinera:any) => {
        let gasolineraWena = BuscadorMunicipiosComponent.parseGasolinera(gasolinera)

        if (gasolineraWena.Municipio.toLowerCase() === municipio.toLowerCase()) {
          
          

        }
      });
    });
  }

  seleccionarCarburante(carburante: string) {
    this.carburante = carburante;  
    this.carburanteSeleccionado = carburante; 
    this.obtenerGasolinerasPorMunicipio(this.municipio)
  }
  
}
