import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { ListaEessprecio } from '../../interfaces/gasolinera.interface';

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
    this.service.getGasolineras().subscribe((res: { ListaEESSPrecio: ListaEessprecio[] }) => {
      res.ListaEESSPrecio.forEach(gasolinera => {
        if (gasolinera.Municipio.toLowerCase() === municipio.toLowerCase()) {
          // Accede a la propiedad de precio en función del carburante seleccionado
          let precio = 'N/A';
          if (this.carburante === 'Gasóleo') {
            precio = gasolinera['Precio Gasoleo A'];
          } else if (this.carburante === 'Gasolina') {
            precio = gasolinera['Precio Gasolina 95 E5'];
          } else if (this.carburante === 'Hidrógeno') {
            precio = gasolinera['Precio Hidrogeno'];
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

  seleccionarCarburante(value: string) {
    this.carburante = value;  
    this.carburanteSeleccionado.emit(value); 
  }
  
}
