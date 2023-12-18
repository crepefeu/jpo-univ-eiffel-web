import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendeeFormComponent } from './add-attendee-form.component';

describe('AddAttendeeFormComponent', () => {
  let component: AddAttendeeFormComponent;
  let fixture: ComponentFixture<AddAttendeeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAttendeeFormComponent]
    });
    fixture = TestBed.createComponent(AddAttendeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
