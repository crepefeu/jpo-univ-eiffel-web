import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ModalService } from 'src/app/services/modal.service';

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

  constructor(private modal: ModalService) {
    this.infosForm = new FormGroup({
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      diploma: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
    });

    this.jpoForm = new FormGroup({
      isIrlAttendee: new FormControl(''),
    });

    this.virtualTourSatisfactionForm = new FormGroup({
      virtualTourSatisfaction: new FormControl(''),
    });

    this.websiteSatisfactionForm = new FormGroup({
      websiteSatisfaction: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  submit() {
    if (this.infosForm.valid && this.jpoForm.valid && this.virtualTourSatisfactionForm.valid && this.websiteSatisfactionForm.valid) {
      console.log('infosForm', this.infosForm.value);
      console.log('jpoForm', this.jpoForm.value);
      console.log('virtualTourSatisfactionForm', this.virtualTourSatisfactionForm.value);
      console.log('websiteSatisfactionForm', this.websiteSatisfactionForm.value);
      this.modal.close();
    }
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
}
