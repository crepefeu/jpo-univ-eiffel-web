import { BreakpointObserver } from '@angular/cdk/layout';
import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { HotToastService } from '@ngneat/hot-toast';
import { Diploma } from 'src/app/models/diploma';
import { Region } from 'src/app/models/region';
import { AttendeesService } from 'src/app/services/attendees.service';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';
import { RegionsService } from 'src/app/services/regions.service';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss']
})
export class MultiStepFormComponent implements OnInit {

  isHandheld = false;

  infosForm: FormGroup;
  jpoForm: FormGroup;
  virtualTourSatisfactionForm: FormGroup;
  websiteSatisfactionForm: FormGroup;

  isSubmitting = false;

  diplomasList: Diploma[] = [];
  regionsList: Region[] = [];

  constructor(private modal: ModalService,
    private diplomas: DiplomasService,
    private regions: RegionsService,
    private attendees: AttendeesService,
    private toast: HotToastService,
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
    this.infosForm = new FormGroup({
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      diplomaId: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
    });

    this.jpoForm = new FormGroup({
      isIrlAttendee: new FormControl(null, Validators.required)
    });

    this.virtualTourSatisfactionForm = new FormGroup({
      virtualTourSatisfaction: new FormControl(null, Validators.required),
    });

    this.websiteSatisfactionForm = new FormGroup({
      websiteSatisfaction: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.diplomas.getAllDiplomas().subscribe({
      next: data => {
        this.diplomasList = data.sort((a: Diploma, b: Diploma) => a.name.localeCompare(b.name));
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

    this.regions.getAllRegions().subscribe({
      next: data => {
        this.regionsList = data.sort((a: Region, b: Region) => a.name.localeCompare(b.name));
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
    })
  }

  submit() {
    this.isSubmitting = true;

    let diploma = this.diplomasList.find(diploma => diploma.id === Number(this.infosForm.controls['diplomaId'].value));

    let attendeeInfos = {
      email: this.infosForm.controls['email'].value,
      firstName: this.infosForm.controls['firstName'].value,
      lastName: this.infosForm.controls['lastName'].value,
      diplomaId: diploma?.id,
      diplomaCategoryId: diploma?.category.id,
      region: this.infosForm.controls['region'].value,
      isIrlAttendee: this.jpoForm.controls['isIrlAttendee'].value,
      virtualTourSatisfaction: this.virtualTourSatisfactionForm.controls['virtualTourSatisfaction'].value,
      websiteSatisfaction: this.websiteSatisfactionForm.controls['websiteSatisfaction'].value
    };

    this.attendees.registerAttendee(attendeeInfos).subscribe({
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
          this.isSubmitting = false;
          this.modal.close();
        } else {
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
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  goToNextStep(stepper: MatStepper) {
    let currentStep = stepper.selectedIndex; // store the current step index to prevent the stepper from skipping steps
    setTimeout(() => {
      stepper.selectedIndex = currentStep + 1; // go to current step + 1 (next step) after 350ms
    }, 350);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: FormControl) => {
      control.markAsDirty();
    });
  }

  checkIfAllFormsAreValid() {
    return !(this.infosForm.valid && this.jpoForm.valid && this.virtualTourSatisfactionForm.valid && this.websiteSatisfactionForm.valid);
  }
}
