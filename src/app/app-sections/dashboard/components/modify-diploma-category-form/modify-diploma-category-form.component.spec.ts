import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDiplomaCategoryFormComponent } from './modify-diploma-category-form.component';

describe('ModifyDiplomaCategoryFormComponent', () => {
  let component: ModifyDiplomaCategoryFormComponent;
  let fixture: ComponentFixture<ModifyDiplomaCategoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDiplomaCategoryFormComponent]
    });
    fixture = TestBed.createComponent(ModifyDiplomaCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
