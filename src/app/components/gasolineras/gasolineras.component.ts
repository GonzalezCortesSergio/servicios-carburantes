import { Component } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-gasolineras',
  templateUrl: './gasolineras.component.html',
  styleUrl: './gasolineras.component.css'
})
export class GasolinerasComponent {

  municipio = "Gasolineras"
  

  constructor(private service: GasolineraService) {}

  llamadaMunicipio(municipio: string){
  
      this.municipio = municipio
    
  }

  lasPatate(promotor: string) {


  }

}
