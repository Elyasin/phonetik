import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrenchKeyboardComponent } from './french-keyboard.component';

describe('FrenchKeyboardComponent', () => {
  let component: FrenchKeyboardComponent;
  let fixture: ComponentFixture<FrenchKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrenchKeyboardComponent ]
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
});
