import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DiplomasService } from 'src/app/services/diplomas.service';

@Component({
  selector: 'app-add-diploma-category-form',
  templateUrl: './add-diploma-category-form.component.html',
  styleUrls: ['./add-diploma-category-form.component.scss']
})
export class AddDiplomaCategoryFormComponent {

  addDiplomaCategoryForm: FormGroup;

  isSubmitting = false;

  constructor(private toast: HotToastService,
    private diplomas: DiplomasService) {
    this.addDiplomaCategoryForm = new FormGroup({
      diplomaCategoryName: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    this.diplomas.addDiplomaCategory(this.addDiplomaCategoryForm.value).subscribe({
      next: data => {
        if (data.status == 'error') {
          this.toast.error(data.message, {
            ...defaultErrorToastConfig
          });
        } else if (data.status == 'success') {
          this.toast.success(data.message, {
            ...defaultSuccessToastConfig
          });
        }
        this.isSubmitting = false;
      },
      error: err => {
        this.toast.error('Une erreur est survenue', {
          ...defaultErrorToastConfig
        });
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false
    });
  }
}