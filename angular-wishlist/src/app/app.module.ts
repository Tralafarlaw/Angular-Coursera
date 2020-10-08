  import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DestinoComponent } from './destino/destino.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';

@NgModule({
  declarations: [
    AppComponent,
    DestinoComponent,
    ListaDestinosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
