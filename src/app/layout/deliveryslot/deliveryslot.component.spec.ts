import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryslotComponent } from './deliveryslot.component';

describe('DeliveryslotComponent', () => {
  let component: DeliveryslotComponent;
  let fixture: ComponentFixture<DeliveryslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
