import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatorderComponent } from './repeatorder.component';

describe('RepeatorderComponent', () => {
  let component: RepeatorderComponent;
  let fixture: ComponentFixture<RepeatorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
