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

  fontSizes(): number[] {
    const sizeArray: number[] = [];
    for (let size = 8; size <= 72; size += 2) {
      sizeArray.push(size);
    }
    return sizeArray;
  }

  getFontListForCKEditorConfig(): string {
    return this.fonts.join(';');
  }

  pasteKey(key: string, lang: KEYBOARD) {
    if (lang === KEYBOARD.ENGLISH) {
      this.editor.instance.insertHtml('<span style="font-family: AlphoneticGB, sans-serif;">' + key + '</span>', 'unfiltered_html');
    } else {
      this.editor.instance.insertHtml('<span style="font-family: Alphonetic, sans-serif;">' + key + '</span>', 'unfiltered_html');
    }
  }

  getEditorConfig() {
   return {
     font_names: this.getFontListForCKEditorConfig(),
     removeButtons: 'Cut,Paste,PasteText,PasteFromWord'
   };
  }


}
