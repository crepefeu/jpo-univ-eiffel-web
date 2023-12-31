import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DiplomaCategory } from 'src/app/models/diplomaCategory';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-diploma-form',
  templateUrl: './add-diploma-form.component.html',
  styleUrls: ['./add-diploma-form.component.scss']
})
export class AddDiplomaFormComponent implements OnInit {
  isHandheld = false;

  addDiplomaForm: FormGroup;
  diplomaCategories?: DiplomaCategory[];

  isSubmitting = false;

  constructor(private diplomas: DiplomasService,
    private toast: HotToastService,
    private responsive: BreakpointObserver,
    private modal: ModalService) {
    this.responsive.observe(['(max-width: 768px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandheld = true;
        } else {
          this.isHandheld = false;
        }
      }
    });

    this.addDiplomaForm = new FormGroup({
      diplomaName: new FormControl('', Validators.required),
      diplomaCategoryId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.diplomas.getAllDiplomaCategories().subscribe({
      next: data => {
        this.diplomaCategories = data.sort((a: DiplomaCategory, b: DiplomaCategory) => a.name.localeCompare(b.name));
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
      }
    });
  }

  onSubmit() {
    this.diplomas.addDiploma(this.addDiplomaForm.value).subscribe({
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
