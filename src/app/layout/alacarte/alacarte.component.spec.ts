import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlacarteComponent } from './alacarte.component';

describe('AlacarteComponent', () => {
  let component: AlacarteComponent;
  let fixture: ComponentFixture<AlacarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlacarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlacarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
