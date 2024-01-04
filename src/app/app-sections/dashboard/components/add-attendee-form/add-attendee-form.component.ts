import { defaultSuccessToastConfig, defaultErrorToastConfig } from './../../../../configs/default-toast.configs';
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
  selector: 'app-add-attendee-form',
  templateUrl: './add-attendee-form.component.html',
  styleUrls: ['./add-attendee-form.component.scss']
})
export class AddAttendeeFormComponent implements OnInit {

  isHandlheld = false;

  addAttendeeForm: FormGroup;

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
          this.isHandlheld = true;
        } else {
          this.isHandlheld = false;
        }
      }
    });

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
        this.diplomasList = data.sort((a: Diploma, b: Diploma) => a.name.localeCompare(b.name));
      },
      error: err => {
        if (this.isHandlheld) {
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
        if (this.isHandlheld) {
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
  }

  onSubmit() {
    this.isSubmitting = true;

    let diploma = this.diplomasList!.find(diploma => diploma.id === Number(this.addAttendeeForm.controls['diplomaId'].value));

    let attendeeInfos = {
      email: this.addAttendeeForm.controls['email'].value,
      firstName: this.addAttendeeForm.controls['firstName'].value,
      lastName: this.addAttendeeForm.controls['lastName'].value,
      diplomaId: diploma?.id,
      diplomaCategoryId: diploma?.category.id,
      region: this.addAttendeeForm.controls['region'].value,
      isIrlAttendee: this.addAttendeeForm.controls['isIrlAttendee'].value,
      virtualTourSatisfaction: null,
      websiteSatisfaction: null
    };

    this.attendees.registerAttendee(attendeeInfos).subscribe({
      next: data => {
        if (data.status === 'success') {
          if (this.isHandlheld) {
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
          if (this.isHandlheld) {
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
        if (this.isHandlheld) {
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
