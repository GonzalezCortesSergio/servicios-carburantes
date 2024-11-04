import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  onChange() {

    this.nombre.emit(this.valor);
  }
}
