import {Component} from '@angular/core';

@Component({
  selector: 'app-english-keyboard',
  templateUrl: './english-keyboard.component.html',
  styleUrls: ['./english-keyboard.component.css']
})
export class EnglishKeyboardComponent {

  private fontClass = 'alphonetik-gb';

  constructor() {
  }

  getFontClass(): string {
    return this.fontClass;
  }

}
