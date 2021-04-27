import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent {

  @Input() tooltip: string;
  @Input() key: string;

  constructor() { }

}
