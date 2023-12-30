import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { defaultToastConfig } from 'src/app/configs/default-toast.config';
import { DiplomaCategory } from 'src/app/models/diplomaCategory';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-diploma-form',
  templateUrl: './add-diploma-form.component.html',
  styleUrls: ['./add-diploma-form.component.scss']
})
export class AddDiplomaFormComponent implements OnInit {
  isHandlheld = false;

  addDiplomaForm: FormGroup;
  diplomaCategories?: DiplomaCategory[];

  isSubmitting = false;

  constructor(private diplomas: DiplomasService,
    private toast: HotToastService,
    private responsive: BreakpointObserver,
    private modal: ModalService) {
    this.responsive.observe(['(max-width: 500px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandlheld = true;
        } else {
          this.isHandlheld = false;
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
      error: err => this.toast.error('Une erreur est survenue', {
        ...defaultToastConfig
      }),
    });
  }

  onSubmit() {
    this.diplomas.addDiploma(this.addDiplomaForm.value).subscribe({
      next: data => {
        if (data.status == 'error') {
          this.toast.error(data.message, {
            ...defaultToastConfig
          });
          return;
        } else if (data.status == 'success') {
          this.toast.success(data.message, {
            ...defaultToastConfig
          });
          this.modal.close();
        }
      },
      error: err => {
        this.toast.error('Une erreur est survenue', {
          ...defaultToastConfig
        });
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false
    });
  }

}
