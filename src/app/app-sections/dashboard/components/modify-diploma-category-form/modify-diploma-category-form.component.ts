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

  data: any;

  modifyDiplomaCategoryForm!: FormGroup;

  isSubmitting = false;

  constructor(private diplomas: DiplomasService,
    private toast: HotToastService,
    private modal: ModalService) {
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
