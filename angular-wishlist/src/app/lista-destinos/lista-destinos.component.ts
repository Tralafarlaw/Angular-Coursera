import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';
import { DestinosApiClient} from '../models/destinos-api-client.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.module';
import {ElegidoFavoritoAction, NuevoDestinoAction} from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  all;
  constructor(public destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter<DestinoViaje>();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(data => {
        if (data != null){
          this.updates.push('se ha elejido a ' + data.nombre);
        }
      });
    store.select(state => state.destinos.items).subscribe(value => this.all = value)
  }

  ngOnInit(): void {
  }
  agregado(d: DestinoViaje): void {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    //this.store.dispatch(new NuevoDestinoAction(d));
  }
  elegido(d: DestinoViaje): void {
    this.destinosApiClient.elegir(d);
   // this.store.dispatch(new ElegidoFavoritoAction(d));
  }

}
