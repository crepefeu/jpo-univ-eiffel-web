import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modify-attendee-form',
  templateUrl: './modify-attendee-form.component.html',
  styleUrls: ['./modify-attendee-form.component.scss']
})
export class ModifyAttendeeFormComponent implements OnInit {

  modifyAttendeeForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    diploma: new FormControl(''),
    isIrlAttendee: new FormControl(false),
    region: new FormControl(''),
  }); 

  constructor() {}

  ngOnInit(): void {}

}
