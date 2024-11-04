import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './modules/material/material.module';
import { BuscadorMunicipiosComponent } from './components/buscador-municipios/buscador-municipios.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { GasolinerasComponent } from './components/gasolineras/gasolineras.component';
import { FormsModule } from '@angular/forms';
import { BuscadorGasolinerasComponent } from './components/buscador-gasolineras/buscador-gasolineras.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorMunicipiosComponent,
    NavMenuComponent,
    GasolinerasComponent,
    BuscadorGasolinerasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
