import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {KEYBOARD} from './keyboard-selector/keyboard-selector.component';
import {FontListService} from './service/font-list.service';
import {AppModule} from './app.module';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fontListServiceStub: Partial<FontListService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [
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

  it('should provide fonts as semi-colon separated string', () => {
    fixture.detectChanges();
    expect(app.getFontListForCKEditorConfig()).toEqual('Arial;Verdana');
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

});
