import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es-MX';
import { MenuComponent } from './components/menu/menu.component';
import { PipesModule } from './pipes/pipes.module';


import 'moment/locale/es';

registerLocaleData(es); 

@NgModule({
  declarations: [AppComponent, MenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PipesModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: "es-MX" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
