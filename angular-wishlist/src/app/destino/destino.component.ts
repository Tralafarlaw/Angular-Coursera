import {Component, OnInit, Input, HostBinding, EventEmitter, Output} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css']
})
export class DestinoComponent implements OnInit {
  @Input() destinos: DestinoViaje;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;
  constructor() {
    this.clicked = new EventEmitter<DestinoViaje>();
  }

  ngOnInit(): void {
  }
  ir(): boolean {
    this.clicked.emit(this.destinos);
    return false;
  }

}
