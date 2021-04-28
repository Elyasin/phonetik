import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-french-keyboard',
  templateUrl: './french-keyboard.component.html',
  styleUrls: ['./french-keyboard.component.css']
})
export class FrenchKeyboardComponent implements OnInit {

  private fontClass = 'alphonetik';

  constructor() {
  }

  ngOnInit(): void {
  }

  getFontClass(): string {
    return this.fontClass;
  }

}
