import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css']
})
export class DestinoComponent implements OnInit {
  @Input() destinos: DestinoViaje;	
  @HostBinding('attr.class') cssClass = 'col-md-4';
  constructor() {}

  ngOnInit(): void {
  }

}
