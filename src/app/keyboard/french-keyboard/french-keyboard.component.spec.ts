import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrenchKeyboardComponent } from './french-keyboard.component';
import {KeyComponent} from '../key/key.component';

describe('FrenchKeyboardComponent', () => {
  let component: FrenchKeyboardComponent;
  let fixture: ComponentFixture<FrenchKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrenchKeyboardComponent, KeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrenchKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the English fonts (alphonetik)', () => {
    expect(component.getFontClass()).toEqual('alphonetik');
  });

});
