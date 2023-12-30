import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDrawerComponent } from './generic-drawer.component';

describe('GenericDrawerComponent', () => {
  let component: GenericDrawerComponent;
  let fixture: ComponentFixture<GenericDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericDrawerComponent]
    });
    fixture = TestBed.createComponent(GenericDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
