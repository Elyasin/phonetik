import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-french-keyboard',
  templateUrl: './french-keyboard.component.html',
  styleUrls: ['./french-keyboard.component.css']
})
export class FrenchKeyboardComponent {

  @Output() pressedKeyEvent = new EventEmitter<string>();

  private fontClass = 'alphonetik';

  constructor() {
  }

  getFontClass(): string {
    return this.fontClass;
  }

  pressKey(key: string) {
    this.pressedKeyEvent.emit(key);
  }
}
