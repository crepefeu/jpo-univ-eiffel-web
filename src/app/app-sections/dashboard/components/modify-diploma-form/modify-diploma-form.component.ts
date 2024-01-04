import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DiplomaCategory } from 'src/app/models/diplomaCategory';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-modify-diploma-form',
  templateUrl: './modify-diploma-form.component.html',
  styleUrls: ['./modify-diploma-form.component.scss']
})
export class ModifyDiplomaFormComponent implements OnInit {
  isHandheld = false;

  data: any;

  modifyDiplomaForm!: FormGroup;

  diplomaCategories: DiplomaCategory[] = [];

  isSubmitting = false;

  constructor(private diplomas: DiplomasService,
    private toast: HotToastService,
    private modal: ModalService,
    private responsive: BreakpointObserver,
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
  }

  ngOnInit(): void {
    this.modifyDiplomaForm = new FormGroup({
      diplomaName: new FormControl(this.data.item.name ?? '', Validators.required),
      diplomaCategoryId: new FormControl(this.data.item.category.id, Validators.required),
    })

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
    this.isSubmitting = true;

    let diploma = {
      id: this.data.item.id,
      diplomaName: this.modifyDiplomaForm.controls['diplomaName'].value,
      diplomaCategoryId: this.modifyDiplomaForm.controls['diplomaCategoryId'].value,
    };

    this.diplomas.modifyDiploma(diploma).subscribe({
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
