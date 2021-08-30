import {Component, OnInit} from '@angular/core';
import {KEYBOARD} from './keyboard-selector/keyboard-selector.component';
import {FontListService} from './service/font-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

}
