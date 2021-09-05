import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent {

  @Input() tooltip: string;
  @Input() key: string;

  @Output() pressedKeyEvent = new EventEmitter<string>();

  constructor() {
  }

  pressKey() {
    this.pressedKeyEvent.emit(this.key);
  }

}
