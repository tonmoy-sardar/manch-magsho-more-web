import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mobilescreen2Component } from './mobilescreen2.component';

describe('Mobilescreen2Component', () => {
  let component: Mobilescreen2Component;
  let fixture: ComponentFixture<Mobilescreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mobilescreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mobilescreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
