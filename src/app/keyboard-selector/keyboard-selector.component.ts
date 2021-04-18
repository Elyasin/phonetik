import {Component, EventEmitter, OnInit, Output} from '@angular/core';

/**
 * Available keyboard options.
 */
export enum KEYBOARD {
  FRENCH = 'FRENCH', ENGLISH = 'ENGLISH'
}

@Component({
  selector: 'app-keyboard-selector',
  templateUrl: './keyboard-selector.component.html',
  styleUrls: ['./keyboard-selector.component.css']
})
export class KeyboardSelectorComponent implements OnInit {

  // for use of the enum type in the html
  KEYBOARD = KEYBOARD;

  @Output()
  selectedKeyboard = new EventEmitter<KEYBOARD>();


  ngOnInit(): void {
    // in HTML the French keyboard is checked
    this.selectKeyboard(KEYBOARD.FRENCH);
  }

  /**
   * Selects the keyboard.
   *
   * @param keyboard - the Keyboard value
   */
  selectKeyboard(keyboard: KEYBOARD): void {
    this.selectedKeyboard.emit(keyboard);
  }

}
