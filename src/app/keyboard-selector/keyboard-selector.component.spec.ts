import {ComponentFixture, TestBed} from '@angular/core/testing';

import {KEYBOARD, KeyboardSelectorComponent} from './keyboard-selector.component';

describe('KeyboardSelectorComponent', () => {

  let component: KeyboardSelectorComponent;
  let fixture: ComponentFixture<KeyboardSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyboardSelectorComponent]
    })
      .compileComponents();
  });

  let selectedKeyboard: KEYBOARD;

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardSelectorComponent);
    component = fixture.componentInstance;
    component.selectedKeyboard.subscribe((keyboard: KEYBOARD) => selectedKeyboard = keyboard);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the French keyboard initially', () => {
    const frenchOptionEl = fixture.nativeElement.querySelector('#french-option');
    expect(frenchOptionEl.attributes.getNamedItem('checked')).toBeTruthy();
  });

  it('should emit the French option initially', () => {
    fixture.detectChanges();
    expect(selectedKeyboard).toBe(KEYBOARD.FRENCH);
  });

  it('should emit French keyboard when clicking on French option', () => {
    const frenchOptionEl = fixture.nativeElement.querySelector('#french-option');
    frenchOptionEl.click();
    expect(selectedKeyboard).toBe(KEYBOARD.FRENCH);
  });

  it('should emit English keyboard when clicking on English option', () => {
    const englishOptionEl: HTMLElement = fixture.nativeElement.querySelector('#english-option');
    englishOptionEl.click();
    expect(selectedKeyboard).toBe(KEYBOARD.ENGLISH);
  });

});
