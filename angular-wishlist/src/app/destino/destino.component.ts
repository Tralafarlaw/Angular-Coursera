import {Component, OnInit, Input, HostBinding, EventEmitter, Output} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';
import {DestinosApiClient} from '../models/destinos-api-client.model';
import {falseIfMissing} from 'protractor/built/util';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css']
})
export class DestinoComponent implements OnInit {
  @Input() destinos: DestinoViaje;
  @Input('idx') posicion: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;
  constructor(public destinosApiClient: DestinosApiClient) {
    this.clicked = new EventEmitter<DestinoViaje>();
  }

  ngOnInit(): void {
  }
  ir(): boolean {
    this.clicked.emit(this.destinos);
    return false;
  }
  voteUp(): boolean{
    this.destinosApiClient.voteUp(this.destinos);
    return false;
  }
  voteDown(): boolean {
    this.destinosApiClient.voteDown(this.destinos);
    return false;
  }

}
