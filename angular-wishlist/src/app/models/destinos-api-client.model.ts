import { DestinoViaje } from './destino-viaje.model';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../app.module';
import {ElegidoFavoritoAction, NuevoDestinoAction, VoteDownAction, VoteUpAction} from './destinos-viajes-state.model';
import {take} from 'rxjs/operators';

@Injectable()
export class DestinosApiClient {
  constructor(public state: Store<AppState>) {}
  add(d: DestinoViaje): void {
    this.state.dispatch(new NuevoDestinoAction(d));
  }
  elegir(d: DestinoViaje): void {
    this.state.dispatch(new ElegidoFavoritoAction(d));
  }
  voteUp(d: DestinoViaje): void {
    this.state.dispatch(new VoteUpAction(d));
  }
  voteDown(d: DestinoViaje): void {
    this.state.dispatch(new VoteDownAction(d));
  }
}
