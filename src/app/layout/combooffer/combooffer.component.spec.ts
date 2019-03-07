import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboofferComponent } from './combooffer.component';

describe('ComboofferComponent', () => {
  let component: ComboofferComponent;
  let fixture: ComponentFixture<ComboofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
