import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {KeyboardSelectorComponent} from './keyboard-selector/keyboard-selector.component';
import {FrenchKeyboardComponent} from './keyboard/french-keyboard/french-keyboard.component';
import {EnglishKeyboardComponent} from './keyboard/english-keyboard/english-keyboard.component';
import {KeyComponent} from './keyboard/key/key.component';
import {CKEditorModule} from 'ckeditor4-angular';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardSelectorComponent,
    FrenchKeyboardComponent,
    EnglishKeyboardComponent,
    KeyComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
