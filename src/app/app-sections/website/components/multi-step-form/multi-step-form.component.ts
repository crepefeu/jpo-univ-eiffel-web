import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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

  constructor() {
    this.infosForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      diploma: new FormControl(''),
      isIrlAttendee: new FormControl(false),
      region: new FormControl(''),
    });

    this.jpoForm = new FormGroup({
      firstName: new FormControl(''),
    });

    this.virtualTourSatisfactionForm = new FormGroup({
      firstName: new FormControl(''),
    });

    this.websiteSatisfactionForm = new FormGroup({
      firstName: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  goToNextStep(stepper: MatStepper) {
    stepper.next();
  }
}
