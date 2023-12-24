import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AttendeesService } from 'src/app/services/attendees.service';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';
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
    private regions: RegionsService,
    private attendees: AttendeesService,
    private toast: HotToastService,
    private modal: ModalService) {
    this.addAttendeeForm = new FormGroup({
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      diplomaId: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      isIrlAttendee: new FormControl(null, Validators.required)
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
    this.isSubmitting = true;

    let diploma = this.diplomasList!.find(diploma => diploma.id === Number(this.addAttendeeForm.controls['diplomaId'].value));
    
    let attendeeInfos = {
      email: this.addAttendeeForm.controls['email'].value,
      firstName: this.addAttendeeForm.controls['firstName'].value,
      lastName: this.addAttendeeForm.controls['lastName'].value,
      diplomaId: diploma.id,
      diplomaCategoryId: diploma.category.id,
      region: this.addAttendeeForm.controls['region'].value,
      isIrlAttendee: this.addAttendeeForm.controls['isIrlAttendee'].value,
      virtualTourSatisfaction: null,
      websiteSatisfaction: null
    };

    this.attendees.registerAttendee(attendeeInfos).subscribe({
      next: data => {
        if (data.status === 'success') {
          this.toast.success('Participant créé avec succès', {
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
        } else if (data.status === 'error') {
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
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

}
