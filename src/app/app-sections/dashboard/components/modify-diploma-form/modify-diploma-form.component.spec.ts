import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDiplomaFormComponent } from './modify-diploma-form.component';

describe('ModifyDiplomaFormComponent', () => {
  let component: ModifyDiplomaFormComponent;
  let fixture: ComponentFixture<ModifyDiplomaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDiplomaFormComponent]
    });
    fixture = TestBed.createComponent(ModifyDiplomaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
