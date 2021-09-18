import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnglishKeyboardComponent} from './english-keyboard.component';
import {KeyComponent} from '../key/key.component';
import {By} from '@angular/platform-browser';

describe('EnglishKeyboardComponent', () => {
  let component: EnglishKeyboardComponent;
  let fixture: ComponentFixture<EnglishKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnglishKeyboardComponent, KeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnglishKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the English fonts (alphonetik-gb)', () => {
    expect(component.getFontClass()).toEqual('alphonetik-gb');
  });

  it('should decorate all app-key elements with the component\'s font class', () => {
    const appKeys = fixture.debugElement.queryAll(By.directive(KeyComponent));
    for (const appKey of appKeys) {
      expect(appKey.componentInstance.key).toBeTruthy();
      expect(appKey.componentInstance.tooltip).toBeTruthy();
      expect(appKey.nativeElement.classList.contains(component.getFontClass())).toEqual(true);
    }
  });

  it('should emit key event when key is pressed', (done) => {
    const expectedKey = 'x';
    component.pressedKeyEvent.subscribe((key: string) => {
      expect(key).toBe(expectedKey);
      done();
    });
    component.pressKey(expectedKey);
  });

});
