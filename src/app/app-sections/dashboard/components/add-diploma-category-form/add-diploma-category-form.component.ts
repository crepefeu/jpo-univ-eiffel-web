import { BreakpointObserver } from '@angular/cdk/layout';
import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-diploma-category-form',
  templateUrl: './add-diploma-category-form.component.html',
  styleUrls: ['./add-diploma-category-form.component.scss']
})
export class AddDiplomaCategoryFormComponent {

  isHandheld = false;

  addDiplomaCategoryForm: FormGroup;

  isSubmitting = false;

  constructor(private toast: HotToastService,
    private diplomas: DiplomasService,
    private responsive: BreakpointObserver,
    private modal: ModalService,
    private sharedService: SharedService) {
    this.responsive.observe(['(max-width: 820px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandheld = true;
        } else {
          this.isHandheld = false;
        }
      }
    });
    this.addDiplomaCategoryForm = new FormGroup({
      diplomaCategoryName: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    this.diplomas.addDiplomaCategory(this.addDiplomaCategoryForm.value).subscribe({
      next: data => {
        if (data.status == 'error') {
          if (this.isHandheld) {
            this.toast.error(data.message, {
              ...defaultErrorToastConfig,
              style: {
                ...defaultErrorToastConfig.style,
                fontSize: '0.8rem',
                position: 'absolute',
                bottom: '65px',
              }
            });
          } else {
            this.toast.error(data.message, {
              ...defaultErrorToastConfig
            });
          }
        } else if (data.status == 'success') {
          if (this.isHandheld) {
            this.toast.success(data.message, {
              ...defaultSuccessToastConfig,
              style: {
                ...defaultSuccessToastConfig.style,
                fontSize: '0.8rem',
                position: 'absolute',
                bottom: '65px',
              }
            });
          } else {
            this.toast.success(data.message, {
              ...defaultSuccessToastConfig
            });
          }
          this.sharedService.updateData(true);
          this.modal.close();
        }
        this.isSubmitting = false;
      },
      error: err => {
        if (this.isHandheld) {
          this.toast.error('Une erreur est survenue', {
            ...defaultErrorToastConfig,
            style: {
              ...defaultErrorToastConfig.style,
              fontSize: '0.8rem',
              position: 'absolute',
              bottom: '65px',
            }
          });
        } else {
          this.toast.error('Une erreur est survenue', {
            ...defaultErrorToastConfig
          });
        }
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false
    });
  }
}