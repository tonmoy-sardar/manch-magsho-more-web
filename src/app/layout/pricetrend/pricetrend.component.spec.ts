import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetrendComponent } from './pricetrend.component';

describe('PricetrendComponent', () => {
  let component: PricetrendComponent;
  let fixture: ComponentFixture<PricetrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
