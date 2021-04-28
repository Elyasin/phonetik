import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-english-keyboard',
  templateUrl: './english-keyboard.component.html',
  styleUrls: ['./english-keyboard.component.css']
})
export class EnglishKeyboardComponent implements OnInit {

  private fontClass = 'alphonetik-gb';

  constructor() {
  }

  ngOnInit(): void {
  }

  getFontClass(): string {
    return this.fontClass;
  }

}
