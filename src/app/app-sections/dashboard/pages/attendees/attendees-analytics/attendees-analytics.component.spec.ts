import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeesAnalyticsComponent } from './attendees-analytics.component';

describe('AttendeesAnalyticsComponent', () => {
  let component: AttendeesAnalyticsComponent;
  let fixture: ComponentFixture<AttendeesAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendeesAnalyticsComponent]
    });
    fixture = TestBed.createComponent(AttendeesAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
