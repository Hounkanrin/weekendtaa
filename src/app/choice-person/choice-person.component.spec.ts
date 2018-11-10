import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePersonComponent } from './choice-person.component';

describe('ChoicePersonComponent', () => {
  let component: ChoicePersonComponent;
  let fixture: ComponentFixture<ChoicePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
