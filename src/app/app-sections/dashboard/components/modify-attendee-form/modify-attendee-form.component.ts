import { defaultErrorToastConfig, defaultSuccessToastConfig } from './../../../../configs/default-toast.configs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Diploma } from 'src/app/models/diploma';
import { Region } from 'src/app/models/region';
import { AttendeesService } from 'src/app/services/attendees.service';
import { DiplomasService } from 'src/app/services/diplomas.service';
import { ModalService } from 'src/app/services/modal.service';
import { RegionsService } from 'src/app/services/regions.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-modify-attendee-form',
  templateUrl: './modify-attendee-form.component.html',
  styleUrls: ['./modify-attendee-form.component.scss']
})
export class ModifyAttendeeFormComponent implements OnInit {

  isHandheld = false;

  data: any;
  modifyAttendeeForm!: FormGroup;

  isSubmitting = false;

  diplomasList?: Diploma[];
  regionsList?: Region[];

  constructor(private diplomas: DiplomasService,
    private regions: RegionsService,
    private attendees: AttendeesService,
    private toast: HotToastService,
    private modal: ModalService,
    private responsive: BreakpointObserver,
    private sharedService: SharedService) {
    this.responsive.observe(['(max-width: 820px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandheld = true;
        } else {
          this.isHandheld = false;
        }
      }
    });
  }

  ngOnInit(): void {

    this.modifyAttendeeForm = new FormGroup({
      firstName: new FormControl(this.data?.item.firstName ?? '', Validators.required),
      lastName: new FormControl(this.data?.item.lastName ?? '', Validators.required),
      email: new FormControl(this.data?.item.email ?? '', Validators.required),
      diplomaId: new FormControl(this.data?.item.diplomaId ?? '', Validators.required),
      region: new FormControl(this.data?.item.regionalCode ?? '', Validators.required),
      isIrlAttendee: new FormControl(this.data?.item.isIrlAttendee ?? '', Validators.required),
      virtualTourSatisfaction: new FormControl(this.data?.item.virtualTourSatisfaction ?? '', Validators.required),
      websiteSatisfaction: new FormControl(this.data?.item.websiteSatisfaction ?? '', Validators.required),
    });

    this.modifyAttendeeForm.controls['virtualTourSatisfaction'].disable();
    this.modifyAttendeeForm.controls['websiteSatisfaction'].disable();

    this.diplomas.getAllDiplomas().subscribe({
      next: data => {
        this.diplomasList = data.sort((a: Diploma, b: Diploma) => a.name.localeCompare(b.name));
      },
      error: err => this.toast.error('Une erreur est survenue', {
        ...defaultErrorToastConfig
      })
    });

    this.regions.getAllRegions().subscribe({
      next: data => {
        this.regionsList = data.sort((a: Region, b: Region) => a.name.localeCompare(b.name));
      },
      error: err => this.toast.error('Une erreur est survenue', {
        ...defaultErrorToastConfig
      })
    })
  }

  onSubmit() {
    this.isSubmitting = true;

    let diploma = this.diplomasList!.find(diploma => diploma.id === Number(this.modifyAttendeeForm.controls['diplomaId'].value));

    let attendee = {
      id: this.data.item.id,
      firstName: this.modifyAttendeeForm.controls['firstName'].value,
      lastName: this.modifyAttendeeForm.controls['lastName'].value,
      email: this.modifyAttendeeForm.controls['email'].value,
      diplomaId: diploma?.id,
      diplomaCategoryId: diploma?.category.id,
      isIrlAttendee: this.modifyAttendeeForm.controls['isIrlAttendee'].value,
      regionalCode: this.modifyAttendeeForm.controls['region'].value
    };

    this.attendees.modifyAttendee(attendee).subscribe({
      next: data => {
        if (data.status === 'success') {
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
          this.sharedService.updateData(true);
          this.modal.close();
        } else if (data.status === 'error') {
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
}
