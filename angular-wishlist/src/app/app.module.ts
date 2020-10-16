import {BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DestinoComponent } from './destino/destino.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import {RouterModule, Routes} from '@angular/router';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import {
  DestinosViajesEffects,
  DestinosViajesState,
  initializeDestinosViajesStates,
  reducerDestinoViaje
} from './models/destinos-viajes-state.model';
import {ActionReducerMap, StoreModule as NgRxStoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent},
  {path: 'destino', component: DestinoDetalleComponent}
];

// reux init
export interface AppState {
  destinos: DestinosViajesState;
}
const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinoViaje
};

const reducersInitialState = {
  destinos: initializeDestinosViajesStates()
};
// redux fin

@NgModule({
  declarations: [
    AppComponent,
    DestinoComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState, runtimeChecks:{
        strictActionImmutability: false,
        strictStateImmutability: false
      }
    }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
