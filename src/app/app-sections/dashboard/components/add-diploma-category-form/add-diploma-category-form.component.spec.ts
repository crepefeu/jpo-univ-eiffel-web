import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiplomaCategoryFormComponent } from './add-diploma-category-form.component';

describe('AddDiplomaCategoryFormComponent', () => {
  let component: AddDiplomaCategoryFormComponent;
  let fixture: ComponentFixture<AddDiplomaCategoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDiplomaCategoryFormComponent]
    });
    fixture = TestBed.createComponent(AddDiplomaCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
