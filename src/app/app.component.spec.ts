import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {KEYBOARD} from './keyboard-selector/keyboard-selector.component';
import {FontListService} from './service/font-list.service';
import {AppModule} from './app.module';
import {CKEditorComponent} from 'ckeditor4-angular';
import {Component} from '@angular/core';

@Component({
  selector: 'ckeditor',
  template: '',
  providers: [{provide: CKEditorComponent, useValue: CkEditorComponentStub}]
})
export class CkEditorComponentStub {
  insertHtml: (html: string, filter: string) => undefined;
}

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fontListServiceStub: Partial<FontListService>;

  beforeEach(waitForAsync(() => {
    fontListServiceStub = {
      getFontList(): string[] {
        return ['Arial', 'Verdana'];
      }
    };

    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CkEditorComponentStub],
      providers: [{provide: FontListService, useValue: fontListServiceStub}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fontListServiceStub = TestBed.inject(FontListService);
    app = fixture.componentInstance;
    fixture.detectChanges();
    app.editor.instance = {
      insertHtml: jest.fn((_html: string, _filter: string) => undefined),
      destroy: jest.fn()
    };
  });


  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should load system fonts on init', () => {
    expect(app.fonts).toEqual(fontListServiceStub.getFontList());
  });

  it('should return the CKEditor config', () => {
    expect(app.getEditorConfig()).toEqual({
      "font_names": "Arial;Verdana",
      "removeButtons": "Cut,Paste,PasteText,PasteFromWord"
    });
  });

  it('should set the selected keyboard', () => {
    app.selectKeyboard(KEYBOARD.FRENCH);
    expect(app.keyboard).toBe(KEYBOARD.FRENCH);
    app.selectKeyboard(KEYBOARD.ENGLISH);
    expect(app.keyboard).toBe(KEYBOARD.ENGLISH);
  });

  it('should initially hide English keyboard and show French keyboard', () => {
    const englishKeyboardEl: HTMLElement = fixture.nativeElement.querySelector('#english-keyboard');
    const frenchKeyboardEl: HTMLElement = fixture.nativeElement.querySelector('#french-keyboard');
    expect(englishKeyboardEl).toBeNull();
    expect(frenchKeyboardEl).not.toBeNull();
  });

  it('should hide French keyboard if English keyboard is set', () => {
    app.selectKeyboard(KEYBOARD.ENGLISH);
    fixture.detectChanges();
    const frenchKeyboardEl: HTMLElement = fixture.nativeElement.querySelector('#french-keyboard');
    const englishKeyboardEl: HTMLElement = fixture.nativeElement.querySelector('#english-keyboard');
    expect(frenchKeyboardEl).toBeNull();
    expect(englishKeyboardEl).not.toBeNull();
  });

  it('should paste the given (French) key into the editor instance', () => {
    app.pasteKey('a', KEYBOARD.FRENCH);
    expect(app.editor.instance.insertHtml).toHaveBeenCalledWith('<span style="font-family: Alphonetic, sans-serif;">a</span>', 'unfiltered_html');
  });

  it('should paste the given (English) key into the editor instance', () => {
    app.pasteKey('x', KEYBOARD.ENGLISH);
    expect(app.editor.instance.insertHtml).toHaveBeenCalledWith('<span style="font-family: AlphoneticGB, sans-serif;">x</span>', 'unfiltered_html');
  });

});
