import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {CamerasComponent} from './cameras/cameras.component';
import {HttpClientModule} from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import {FormsModule} from '@angular/forms';
import { LayoutlistsComponent } from './layoutlists/layoutlists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CamerasComponent,
    LayoutComponent,
    LayoutlistsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
