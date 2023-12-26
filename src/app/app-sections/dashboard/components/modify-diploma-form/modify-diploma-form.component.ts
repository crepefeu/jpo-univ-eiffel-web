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
  data: any;

  modifyDiplomaForm!: FormGroup;

  diplomaCategories: DiplomaCategory[] = [];

  isSubmitting = false;

  constructor(private diplomas: DiplomasService,
    private toast: HotToastService,
    private modal: ModalService) {
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
        duration: 4000,
        position: 'bottom-center',
        style: {
          backgroundColor: 'var(--toast-bkg)',
          color: 'var(--toast-txt)',
          borderRadius: '30px',
          border: '1.5px solid var(--toast-error)',
          fontWeight: '400',
          padding: '3px 10px'
        }
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
            duration: 4000,
            position: 'bottom-center',
            style: {
              backgroundColor: 'var(--toast-bkg)',
              color: 'var(--toast-txt)',
              borderRadius: '30px',
              border: '1.5px solid var(--toast-error)',
              fontWeight: '400',
              padding: '3px 10px'
            }
          });
          return;
        } else if (data.status == 'success') {
          this.toast.success(data.message, {
            duration: 4000,
            position: 'bottom-center',
            style: {
              backgroundColor: 'var(--toast-bkg)',
              color: 'var(--toast-txt)',
              borderRadius: '30px',
              border: '1.5px solid var(--toast-success)',
              fontWeight: '400',
              padding: '3px 10px'
            }
          });
          this.modal.close();
        }
      },
      error: err => {
        this.toast.error('Une erreur est survenue', {
          duration: 4000,
          position: 'bottom-center',
          style: {
            backgroundColor: 'var(--toast-bkg)',
            color: 'var(--toast-txt)',
            borderRadius: '30px',
            border: '1.5px solid var(--toast-error)',
            fontWeight: '400',
            padding: '3px 10px'
          }
        });
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false
    });
  }
}
