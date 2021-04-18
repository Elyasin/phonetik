import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {KEYBOARD, KeyboardSelectorComponent} from './keyboard-selector/keyboard-selector.component';
import {FontListService} from './service/font-list.service';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fontListServiceStub: Partial<FontListService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        KeyboardSelectorComponent
      ],
      providers: [
        // {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: FontListService, useValue: fontListServiceStub}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fontListServiceStub = {
      getFontList(): string[] {
        return ['Arial', 'Verdana'];
      }
    };
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should load system fonts on init', () => {
    fixture.detectChanges();
    expect(app.fonts).toEqual(fontListServiceStub.getFontList());
  });

  it('should set the selected keyboard', () => {
    app.selectKeyboard(KEYBOARD.FRENCH);
    expect(app.keyboard).toBe(KEYBOARD.FRENCH);
    app.selectKeyboard(KEYBOARD.ENGLISH);
    expect(app.keyboard).toBe(KEYBOARD.ENGLISH);
  });

  it('should initially hide English keyboard and show French keyboard', () => {
    fixture.detectChanges();
    const englishKeyboardEl: HTMLElement = fixture.nativeElement.querySelector('#english-keyboard');
    const frenchKeyboardEl: HTMLElement = fixture.nativeElement.querySelector('#french-keyboard');
    expect(englishKeyboardEl).toBeNull();
    expect(frenchKeyboardEl).not.toBeNull();
  });

  it('should hide French keyboard if English keyboard is set', () => {
    fixture.detectChanges(); // initially French keyboard is selected
    app.selectKeyboard(KEYBOARD.ENGLISH);
    fixture.detectChanges();
    const frenchKeyboardEl: HTMLElement = fixture.nativeElement.querySelector('#french-keyboard');
    const englishKeyboardEl: HTMLElement = fixture.nativeElement.querySelector('#english-keyboard');
    expect(frenchKeyboardEl).toBeNull();
    expect(englishKeyboardEl).not.toBeNull();
  });

  it('should have have font size options 8,10,...,72', () => {
    fixture.detectChanges();
    const fontSizeEl: HTMLElement = fixture.nativeElement.querySelector('#font-size');
    const optionEls: NodeListOf<HTMLOptionElement> = fontSizeEl.querySelectorAll('option');
    for (let i = 0; i <= 32; i++) {
      const optionEl: HTMLOptionElement = optionEls.item(i);
      const fontSize = 8 + 2 * i;
      expect(optionEl.textContent).toEqual(fontSize.toString());
      expect(optionEl.value).toEqual(fontSize.toString());
    }
  });

  it('should have font size 12 selected by initially', () => {
    fixture.detectChanges();
    const fontSizeEl: HTMLElement = fixture.nativeElement.querySelector('#font-size');
    const optionEls: NodeListOf<HTMLOptionElement> = fontSizeEl.querySelectorAll('option');
    // font sizes are 8,10,12,...
    expect(optionEls.item(2).selected).toBeTruthy();
  });

});
