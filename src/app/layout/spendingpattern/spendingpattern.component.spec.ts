import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingpatternComponent } from './spendingpattern.component';

describe('SpendingpatternComponent', () => {
  let component: SpendingpatternComponent;
  let fixture: ComponentFixture<SpendingpatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingpatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingpatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
