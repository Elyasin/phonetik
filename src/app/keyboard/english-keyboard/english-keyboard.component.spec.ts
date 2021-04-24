import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishKeyboardComponent } from './english-keyboard.component';

describe('EnglishKeyboardComponent', () => {
  let component: EnglishKeyboardComponent;
  let fixture: ComponentFixture<EnglishKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnglishKeyboardComponent ]
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
});
