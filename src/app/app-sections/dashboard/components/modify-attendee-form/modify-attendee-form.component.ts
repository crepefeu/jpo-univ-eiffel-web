import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { RegionsService } from 'src/app/services/regions.service';

@Component({
  selector: 'app-modify-attendee-form',
  templateUrl: './modify-attendee-form.component.html',
  styleUrls: ['./modify-attendee-form.component.scss']
})
export class ModifyAttendeeFormComponent implements OnInit {

  data: any;
  modifyAttendeeForm!: FormGroup;

  isSubmitting = false;

  diplomasList?: any[];
  regionsList?: any[];

  constructor(private diplomas: DiplomasService,
    private regions: RegionsService) {}

  ngOnInit(): void {

    this.modifyAttendeeForm = new FormGroup({
      firstName: new FormControl(this.data?.listItem.firstName ?? '', Validators.required),
      lastName: new FormControl(this.data?.listItem.lastName ?? '', Validators.required),
      email: new FormControl(this.data?.listItem.email ?? '', Validators.required),
      diplomaId: new FormControl(this.data?.listItem.diplomaId ?? '', Validators.required),
      region: new FormControl(this.data?.listItem.regionalCode ?? '', Validators.required),
      isIrlAttendee: new FormControl(this.data?.listItem.isIrlAttendee ?? '', Validators.required),
    });

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

}
