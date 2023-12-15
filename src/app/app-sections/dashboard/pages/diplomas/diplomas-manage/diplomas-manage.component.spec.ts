import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomasManageComponent } from './diplomas-manage.component';

describe('DiplomasManageComponent', () => {
  let component: DiplomasManageComponent;
  let fixture: ComponentFixture<DiplomasManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomasManageComponent]
    });
    fixture = TestBed.createComponent(DiplomasManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
