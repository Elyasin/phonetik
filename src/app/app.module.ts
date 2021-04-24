import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyboardSelectorComponent } from './keyboard-selector/keyboard-selector.component';
import {NgxElectronModule} from 'ngx-electron';
import { FrenchKeyboardComponent } from './keyboard/french-keyboard/french-keyboard.component';
import { EnglishKeyboardComponent } from './keyboard/english-keyboard/english-keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardSelectorComponent,
    FrenchKeyboardComponent,
    EnglishKeyboardComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
