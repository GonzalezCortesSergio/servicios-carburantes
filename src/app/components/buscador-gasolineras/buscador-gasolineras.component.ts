import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { BuscadorMunicipiosComponent } from '../../components/buscador-municipios/buscador-municipios.component'

@Component({
  selector: 'app-buscador-gasolineras',
  templateUrl: './buscador-gasolineras.component.html',
  styleUrls: ['./buscador-gasolineras.component.css']
})
export class BuscadorGasolinerasComponent {

  @Input() titulo!: string;

  @Input() municipio!: string;
  @Output() carburanteSeleccionado = new EventEmitter<string>();

  tiposCarburantes = ['Gasóleo', 'Gasolina', 'Hidrógeno'];
  gasolinerasFiltradas: Array<{ nombre: string, direccion: string, precio: string }> = [];

  carburante!: string;

  constructor(private service: GasolineraService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['municipio']) {
      this.obtenerGasolinerasPorMunicipio(this.municipio);
    }
  }

  obtenerGasolinerasPorMunicipio(municipio: string) {
    this.gasolinerasFiltradas = [];
    this.service.getGasolineras().subscribe(( res) => {
      res.ListaEESSPrecio.forEach((gasolinera:any) => {
       let gasolineraWena = BuscadorMunicipiosComponent.parseGasolinera(gasolinera)
        if (gasolinera.Municipio.toLowerCase() === municipio.toLowerCase()) {
          
          let precio = 'N/A';
          if (this.carburante === 'Gasóleo') {
            precio = gasolinera['Precio Gasóleo'];
          } else if (this.carburante === 'Gasolina') {
            precio = gasolinera['Precio Gasolina'];
          } else if (this.carburante === 'Hidrógeno') {
            precio = gasolinera['Precio Hidrógeno'];
          }

          this.gasolinerasFiltradas.push({
            nombre: gasolinera.Rótulo,
            direccion: gasolinera.Dirección,
            precio
          });
        }
      });
    });
  }

  seleccionarCarburante(carburante: string) {
    this.carburante = carburante;  
    this.carburanteSeleccionado.emit(carburante); 
    this.obtenerGasolinerasPorMunicipio(this.municipio)
  }
  
}
