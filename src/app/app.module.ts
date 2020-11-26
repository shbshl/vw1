import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {CamerasComponent} from './cameras/cameras.component';
import {LayoutComponent} from './layout/layout.component';
import {LayoutlistsComponent} from './layoutlists/layoutlists.component';
import {MaterialModule} from './material-module/material.module';
import { MatComponent } from './mat/mat.component';
import { CamerasFilterPipe } from './cameras/cameras-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CamerasComponent,
    LayoutComponent,
    LayoutlistsComponent,
    MatComponent,
    CamerasFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
