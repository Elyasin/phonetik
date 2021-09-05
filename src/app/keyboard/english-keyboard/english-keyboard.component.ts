import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-english-keyboard',
  templateUrl: './english-keyboard.component.html',
  styleUrls: ['./english-keyboard.component.css']
})
export class EnglishKeyboardComponent {

  @Output() pressedKeyEvent = new EventEmitter<string>();

  private fontClass = 'alphonetik-gb';

  constructor() {
  }

  getFontClass(): string {
    return this.fontClass;
  }

  pressKey(key: string) {
    this.pressedKeyEvent.emit(key);
  }
}
