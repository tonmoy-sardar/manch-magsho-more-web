import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilescreenComponent } from './mobilescreen.component';

describe('MobilescreenComponent', () => {
  let component: MobilescreenComponent;
  let fixture: ComponentFixture<MobilescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilescreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
