import {ComponentFixture, TestBed} from '@angular/core/testing';

import {KeyComponent} from './key.component';

describe('KeyComponent', () => {
  let component: KeyComponent;
  let fixture: ComponentFixture<KeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the key with tooltip', () => {
    component.key = 'k';
    component.tooltip = '(c)ool'
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.attributes.getNamedItem('title').value).toEqual('(c)ool');
    expect(buttonEl.textContent).toEqual('k');
    // uses bootstrap for tooltips
    expect(buttonEl.attributes.getNamedItem('data-bs-toggle').value).toEqual('tooltip');
  });

  it('should emit key when key is pressed', (done) => {
    component.key = 'x';
    component.pressedKeyEvent.subscribe((key: string) => {
      expect(key).toBe(component.key);
      done();
    });
    component.pressKey();
  });

});
