import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyboardSelectorComponent } from './keyboard-selector/keyboard-selector.component';
import {NgxElectronModule} from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardSelectorComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
