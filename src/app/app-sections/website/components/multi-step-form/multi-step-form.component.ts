import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
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

  infosForm: FormGroup;
  jpoForm: FormGroup;
  virtualTourSatisfactionForm: FormGroup;
  websiteSatisfactionForm: FormGroup;

  diplomasList?: any[];
  regionsList?: any[];

  constructor(private modal: ModalService,
    private diplomas: DiplomasService,
    private regions: RegionsService,
    private attendees: AttendeesService) {
    this.infosForm = new FormGroup({
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      diploma: new FormControl('', Validators.required),
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
        this.diplomasList = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
      },
      error: err => console.error('An error occurred :', err),
      complete: () => console.log('getAllDiplomas() completed')
    });

    this.regions.getAllRegions().subscribe({
      next: data => {
        this.regionsList = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
      },
      error: err => console.error('An error occurred :', err),
      complete: () => console.log('getAllRegions() completed')
    })
  }

  submit() {
    let attendeeInfos = {
      email: this.infosForm.controls['email'].value,
      firstName: this.infosForm.controls['firstName'].value,
      lastName: this.infosForm.controls['lastName'].value,
      diploma: this.infosForm.controls['diploma'].value,
      region: this.infosForm.controls['region'].value,
      isIrlAttendee: this.jpoForm.controls['isIrlAttendee'].value,
      virtualTourSatisfaction: this.virtualTourSatisfactionForm.controls['virtualTourSatisfaction'].value,
      websiteSatisfaction: this.websiteSatisfactionForm.controls['websiteSatisfaction'].value
    };

    console.log(attendeeInfos);

    this.attendees.registerAttendee(attendeeInfos).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => console.error('An error occurred :', err),
      complete: () => {
        console.log('registerAttendee() completed');
        this.modal.close();
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
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsDirty();
    });
  }

  checkIfAllFormsAreValid() {
    return !(this.infosForm.valid && this.jpoForm.valid && this.virtualTourSatisfactionForm.valid && this.websiteSatisfactionForm.valid);
  }
}
