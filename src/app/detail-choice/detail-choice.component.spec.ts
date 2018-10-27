import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChoiceComponent } from './detail-choice.component';

describe('DetailChoiceComponent', () => {
  let component: DetailChoiceComponent;
  let fixture: ComponentFixture<DetailChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
