import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DiplomaCategory } from 'src/app/models/diplomaCategory';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modify-diploma-form',
  templateUrl: './modify-diploma-form.component.html',
  styleUrls: ['./modify-diploma-form.component.scss']
})
export class ModifyDiplomaFormComponent implements OnInit {
  isHandlheld = false;

  data: any;

  modifyDiplomaForm!: FormGroup;

  diplomaCategories: DiplomaCategory[] = [];

  isSubmitting = false;

  constructor(private diplomas: DiplomasService,
    private toast: HotToastService,
    private modal: ModalService,
    private responsive: BreakpointObserver) {
    this.responsive.observe(['(max-width: 500px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandlheld = true;
        } else {
          this.isHandlheld = false;
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
      error: err => this.toast.error('Une erreur est survenue', {
        ...defaultErrorToastConfig
      }),
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
          this.toast.error(data.message, {
            ...defaultErrorToastConfig
          });
          return;
        } else if (data.status == 'success') {
          this.toast.success(data.message, {
            ...defaultSuccessToastConfig
          });
          this.modal.close();
        }
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
