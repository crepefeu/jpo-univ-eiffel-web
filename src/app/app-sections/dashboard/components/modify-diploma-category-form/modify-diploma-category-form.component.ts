import { BreakpointObserver } from '@angular/cdk/layout';
import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modify-diploma-category-form',
  templateUrl: './modify-diploma-category-form.component.html',
  styleUrls: ['./modify-diploma-category-form.component.scss']
})
export class ModifyDiplomaCategoryFormComponent {

  isHandheld = false;

  data: any;

  modifyDiplomaCategoryForm!: FormGroup;

  isSubmitting = false;

  constructor(private diplomas: DiplomasService,
    private toast: HotToastService,
    private modal: ModalService,
    private responsive: BreakpointObserver) {
    this.responsive.observe(['(max-width: 500px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandheld = true;
        } else {
          this.isHandheld = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.modifyDiplomaCategoryForm = new FormGroup({
      diplomaCategoryName: new FormControl(this.data.item.name ?? '', Validators.required),
    })
  }

  onSubmit() {
    this.isSubmitting = true;
    
    let diplomaCategory = {
      id: this.data.item.id,
      diplomaCategoryName: this.modifyDiplomaCategoryForm.controls['diplomaCategoryName'].value,
    };

    this.diplomas.modifyDiplomaCategory(diplomaCategory).subscribe({
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
          this.modal.close();
        }
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
