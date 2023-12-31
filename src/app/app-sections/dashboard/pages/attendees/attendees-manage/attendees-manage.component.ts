import { Component, OnInit } from '@angular/core';
import { AttendeesService } from 'src/app/services/attendees.service';
import { ManageListTypes } from 'src/app/enums/manageListTypes.enum';
import { HotToastService } from '@ngneat/hot-toast';
import { Attendee } from 'src/app/models/attendee';
import { defaultErrorToastConfig } from 'src/app/configs/default-toast.configs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-attendees-manage',
  templateUrl: './attendees-manage.component.html',
  styleUrls: ['./attendees-manage.component.scss']
})
export class AttendeesManageComponent implements OnInit {
  isHandheld = false;

  attendeesList?: Attendee[];
  listType: ManageListTypes = ManageListTypes.Attendees;
  isLoading = false;

  constructor(private attendeesService: AttendeesService,
    private toast: HotToastService,
    private responsive: BreakpointObserver,
    private sharedService: SharedService) {
    this.responsive.observe(['(max-width: 768px)']).subscribe({
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
    this.sharedService.dataChanges().subscribe({
      next: data => {
        if (data) {
          this.refreshData();
        } else {
          return;
        }
      }
    });
    
    this.refreshData();
  }

  refreshData() {
    this.isLoading = true;

    this.attendeesService.getAllAttendees().subscribe({
      next: data => {
        this.attendeesList = data;
        this.isLoading = false;
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
          this.toast.error('Une erreur est survenue', defaultErrorToastConfig);
        }
        this.isLoading = false;
      }
    });
  }
}
