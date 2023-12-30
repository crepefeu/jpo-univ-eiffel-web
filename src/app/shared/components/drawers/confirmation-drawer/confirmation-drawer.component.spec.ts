import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDrawerComponent } from './confirmation-drawer.component';

describe('ConfirmationDrawerComponent', () => {
  let component: ConfirmationDrawerComponent;
  let fixture: ComponentFixture<ConfirmationDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDrawerComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
