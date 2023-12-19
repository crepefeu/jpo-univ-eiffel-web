import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAttendeeFormComponent } from './modify-attendee-form.component';

describe('ModifyAttendeeFormComponent', () => {
  let component: ModifyAttendeeFormComponent;
  let fixture: ComponentFixture<ModifyAttendeeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyAttendeeFormComponent]
    });
    fixture = TestBed.createComponent(ModifyAttendeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
