import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeesManageComponent } from './attendees-manage.component';

describe('AttendeesManageComponent', () => {
  let component: AttendeesManageComponent;
  let fixture: ComponentFixture<AttendeesManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendeesManageComponent]
    });
    fixture = TestBed.createComponent(AttendeesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
