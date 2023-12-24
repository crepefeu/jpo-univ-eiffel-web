import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AttendeesService } from 'src/app/services/attendees.service';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';
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
    private regions: RegionsService,
    private attendees: AttendeesService,
    private toast: HotToastService,
    private modal: ModalService) {}

  ngOnInit(): void {

    this.modifyAttendeeForm = new FormGroup({
      firstName: new FormControl(this.data?.listItem.firstName ?? '', Validators.required),
      lastName: new FormControl(this.data?.listItem.lastName ?? '', Validators.required),
      email: new FormControl(this.data?.listItem.email ?? '', Validators.required),
      diplomaId: new FormControl(this.data?.listItem.diplomaId ?? '', Validators.required),
      region: new FormControl(this.data?.listItem.regionalCode ?? '', Validators.required),
      isIrlAttendee: new FormControl(this.data?.listItem.isIrlAttendee ?? '', Validators.required),
      virtualTourSatisfaction: new FormControl(this.data?.listItem.virtualTourSatisfaction ?? '', Validators.required),
      websiteSatisfaction: new FormControl(this.data?.listItem.websiteSatisfaction ?? '', Validators.required),
    });

    this.modifyAttendeeForm.controls['virtualTourSatisfaction'].disable();
    this.modifyAttendeeForm.controls['websiteSatisfaction'].disable();

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

    let diploma = this.diplomasList!.find(diploma => diploma.id === Number(this.modifyAttendeeForm.controls['diplomaId'].value));
    
    let attendee = {
      id: this.data.listItem.id,
      firstName: this.modifyAttendeeForm.controls['firstName'].value,
      lastName: this.modifyAttendeeForm.controls['lastName'].value,
      email: this.modifyAttendeeForm.controls['email'].value,
      diplomaId: diploma.id,
      diplomaCategoryId: diploma.category.id,
      isIrlAttendee: this.modifyAttendeeForm.controls['isIrlAttendee'].value,
      regionalCode: this.modifyAttendeeForm.controls['region'].value
    };

    this.attendees.updateAttendee(attendee).subscribe({
      next: data => {
        if (data.status === 'success') {
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
