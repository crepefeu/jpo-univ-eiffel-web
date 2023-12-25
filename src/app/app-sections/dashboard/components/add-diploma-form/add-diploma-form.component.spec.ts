import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiplomaFormComponent } from './add-diploma-form.component';

describe('AddDiplomaFormComponent', () => {
  let component: AddDiplomaFormComponent;
  let fixture: ComponentFixture<AddDiplomaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDiplomaFormComponent]
    });
    fixture = TestBed.createComponent(AddDiplomaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
