import {Component} from '@angular/core';

@Component({
  selector: 'app-french-keyboard',
  templateUrl: './french-keyboard.component.html',
  styleUrls: ['./french-keyboard.component.css']
})
export class FrenchKeyboardComponent {

  private fontClass = 'alphonetik';

  constructor() {
  }

  getFontClass(): string {
    return this.fontClass;
  }

}
