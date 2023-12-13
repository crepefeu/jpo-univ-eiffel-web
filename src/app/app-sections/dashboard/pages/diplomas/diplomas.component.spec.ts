import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomasComponent } from './diplomas.component';

describe('DiplomasComponent', () => {
  let component: DiplomasComponent;
  let fixture: ComponentFixture<DiplomasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomasComponent]
    });
    fixture = TestBed.createComponent(DiplomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
