import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUserdetailsComponent } from './sidebar-userdetails.component';

describe('SidebarUserdetailsComponent', () => {
  let component: SidebarUserdetailsComponent;
  let fixture: ComponentFixture<SidebarUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
