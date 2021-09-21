import {Component, OnInit, ViewChild} from '@angular/core';
import {KEYBOARD} from './keyboard-selector/keyboard-selector.component';
import {FontListService} from './service/font-list.service';
import {CKEditorComponent} from 'ckeditor4-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('ckEditorComponent') editor: CKEditorComponent;

  // for use of the enum type in the html
  KEYBOARD = KEYBOARD;
  // has the value of the selected keyboard
  keyboard: KEYBOARD;
  // list of supported fonts
  fonts: string[] = [];

  constructor(private fontListService: FontListService) {
  }

  ngOnInit(): void {
    this.fonts = this.fontListService.getFontList();
  }

  /**
   * Sets the selected keyboard.
   *
   * @param keyboard - the Keyboard value
   */
  selectKeyboard(keyboard: KEYBOARD): void {
    this.keyboard = keyboard;
  }

  /**
   * Pastes the keyboard key to the editor's content (unfiltered)
   * @param key the key - a single char
   * @param lang the keyboard language
   */
  pasteKey(key: string, lang: KEYBOARD) {
    if (lang === KEYBOARD.ENGLISH) {
      this.editor.instance.insertHtml('<span style="font-family: AlphoneticGB, sans-serif;">' + key + '</span>', 'unfiltered_html');
    } else {
      this.editor.instance.insertHtml('<span style="font-family: Alphonetic, sans-serif;">' + key + '</span>', 'unfiltered_html');
    }
  }

  /**
   * Returns the config for the CKEditor.
   * Sets font names and removes some toolbar buttons.
   */
  getEditorConfig() {
    return {
      font_names: this.getFontListForCKEditorConfig(),
      removeButtons: 'Cut,Paste,PasteText,PasteFromWord'
    };
  }

  // Returns the ';' separated fonts. Used for CKEditor config.
  private getFontListForCKEditorConfig(): string {
    return this.fonts.join(';');
  }

}
