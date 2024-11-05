import { Component } from '@angular/core';

@Component({
  selector: 'app-gasolineras',
  templateUrl: './gasolineras.component.html',
  styleUrl: './gasolineras.component.css'
})
export class GasolinerasComponent {

  municipio = "Gasolineras"

  llamadaMunicipio(municipio: string){
  
      this.municipio = municipio
    
  }

  lasPatate(promotor: string) {


  }

}
