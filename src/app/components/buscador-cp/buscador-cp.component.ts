import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodigoPostal } from '../../interfaces/codigo-postal.interface';
import { CodigoPostalService } from '../../services/codigo-postal.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscador-cp',
  templateUrl: './buscador-cp.component.html',
  styleUrl: './buscador-cp.component.css'
})
export class BuscadorCpComponent implements OnInit{

  listaCodigosPostales: number[] = [];
  codigoPostal = new FormControl("");
  filteredOptions!: Observable<number[]>;

  @Output() codigoPostalEscogido = new EventEmitter<number>;

  constructor(private service: CodigoPostalService){}

  ngOnInit(): void {
      
    this.service.getCodigosPostales().subscribe(res => {

      res.forEach(codigoPostal => {

        this.listaCodigosPostales.push(codigoPostal.codigo_postal);
      })

      
    })

    this.filteredOptions = this.codigoPostal.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || "")),
    );
  }

  private _filter (value: string): number[] {

    let valueNormal = parseInt(value);

    return this.listaCodigosPostales.filter(option => option == valueNormal );
  }
}
