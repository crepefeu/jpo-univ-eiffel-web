import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { RegionsService } from 'src/app/services/regions.service';

@Component({
  selector: 'app-add-attendee-form',
  templateUrl: './add-attendee-form.component.html',
  styleUrls: ['./add-attendee-form.component.scss']
})
export class AddAttendeeFormComponent implements OnInit {

  addAttendeeForm: FormGroup;
  
  isSubmitting = false;

  diplomasList?: any[];
  regionsList?: any[];

  constructor(private diplomas: DiplomasService,
    private regions: RegionsService) {
    this.addAttendeeForm = new FormGroup({
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      diplomaId: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      isIrlAttendee: new FormControl(null, Validators.required),
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

  onSubmit() {
    console.log('Form submitted');
  }

}
