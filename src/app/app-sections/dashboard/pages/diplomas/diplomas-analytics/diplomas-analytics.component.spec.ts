import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomasAnalyticsComponent } from './diplomas-analytics.component';

describe('DiplomasAnalyticsComponent', () => {
  let component: DiplomasAnalyticsComponent;
  let fixture: ComponentFixture<DiplomasAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomasAnalyticsComponent]
    });
    fixture = TestBed.createComponent(DiplomasAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
