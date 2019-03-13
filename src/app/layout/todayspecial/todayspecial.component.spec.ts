import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayspecialComponent } from './todayspecial.component';

describe('TodayspecialComponent', () => {
  let component: TodayspecialComponent;
  let fixture: ComponentFixture<TodayspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
