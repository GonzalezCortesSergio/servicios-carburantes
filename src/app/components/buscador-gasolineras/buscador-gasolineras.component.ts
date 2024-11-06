import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { Gasolinera } from '../../models/gasolinera.dto';
import { BuscadorMunicipiosComponent } from '../../components/buscador-municipios/buscador-municipios.component';

@Component({
  selector: 'app-buscador-gasolineras',
  templateUrl: './buscador-gasolineras.component.html',
  styleUrls: ['./buscador-gasolineras.component.css']
})
export class BuscadorGasolinerasComponent implements OnInit {

  @Input() titulo!: string;
  @Input() municipio!: string;
  @Input() carburanteSeleccionado!: string;
  @Output() gasolineraSeleccionada = new EventEmitter<Gasolinera>();

  tiposCarburantes = [
    { nombre: 'Gasóleo', propiedad: 'PrecioGasoleoA' },
    { nombre: 'Gasolina', propiedad: 'PrecioGasolina95E5' },
    { nombre: 'Hidrógeno', propiedad: 'PrecioHidrogen' }
  ];
  
  gasolinerasFiltradas: Gasolinera[] = [];
  carburante!: string;
  
  constructor(private service: GasolineraService) {}

  ngOnInit(): void {
    
    this.obtenerGasolineras();
  }

  obtenerGasolineras() {
    this.gasolinerasFiltradas = [];  

    this.service.getGasolineras().subscribe((response) => {
      const gasolineras = response.ListaEESSPrecio;

      if (this.municipio) {
        for (let i = 0; i < gasolineras.length; i++) {
          const gasolinera = gasolineras[i];
          if (gasolinera.Municipio.toLowerCase() === this.municipio.toLowerCase()) {
            let gasolineraParsed = BuscadorMunicipiosComponent.parseGasolinera(gasolinera);
            this.gasolinerasFiltradas.push(gasolineraParsed);
          }
        }
      } else {

        for (let i = 0; i < gasolineras.length; i++) {
          let gasolineraParsed = BuscadorMunicipiosComponent.parseGasolinera(gasolineras[i]);
          this.gasolinerasFiltradas.push(gasolineraParsed);
        }
      }
    });
  }

  obtenerGasolinerasPorMunicipio(municipio: string) {
    this.gasolinerasFiltradas = [];
    this.service.getGasolineras().subscribe((res) => {
      const gasolineras = res.ListaEESSPrecio;
      for (let i = 0; i < gasolineras.length; i++) {
        let gasolineraParsed = BuscadorMunicipiosComponent.parseGasolinera(gasolineras[i]);
        const propiedadCarburante = this.tiposCarburantes.find(
          tipo => tipo.nombre === this.carburanteSeleccionado
        )?.propiedad as keyof Gasolinera;

        if (
          gasolineraParsed.Municipio.toLowerCase() === municipio.toLowerCase() &&
          propiedadCarburante &&
          gasolineraParsed[propiedadCarburante]
        ) {
          this.gasolinerasFiltradas.push(gasolineraParsed);
        }
      }
    });
  }

  seleccionarCarburante(carburante: string) {
    this.carburante = carburante;
    this.carburanteSeleccionado = carburante;
    this.obtenerGasolinerasPorMunicipio(this.municipio);
  }
  
  obtenerPrecioCarburante(gasolinera: Gasolinera): string {
    const carburante = this.carburanteSeleccionado;
    switch (carburante) {
      case 'Gasóleo':
        return gasolinera.PrecioGasoleoA || 'N/A';
      case 'Gasolina':
        return gasolinera.PrecioGasolina95E5 || 'N/A';
      case 'Hidrógeno':
        return gasolinera.PrecioHidrogen || 'N/A';
      default:
        return 'N/A';
    }
  }
}
