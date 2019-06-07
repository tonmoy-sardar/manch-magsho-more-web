import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingpatternbarComponent } from './spendingpatternbar.component';

describe('SpendingpatternbarComponent', () => {
  let component: SpendingpatternbarComponent;
  let fixture: ComponentFixture<SpendingpatternbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingpatternbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingpatternbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
