import { Component, OnInit } from '@angular/core';
import { AttendeesService } from 'src/app/services/attendees.service';
import { ManageListTypes } from 'src/app/enums/manageListTypes.enum';
import { HotToastService } from '@ngneat/hot-toast';
import { Attendee } from 'src/app/models/attendee';

@Component({
  selector: 'app-attendees-manage',
  templateUrl: './attendees-manage.component.html',
  styleUrls: ['./attendees-manage.component.scss']
})
export class AttendeesManageComponent implements OnInit {

  attendeesList?: Attendee[];
  listType: ManageListTypes = ManageListTypes.Attendees;
  isLoading = false;

  constructor(private attendeesService: AttendeesService,
    private toast: HotToastService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.attendeesService.getAllAttendees().subscribe({
      next: data => {
        this.attendeesList = data;
        this.isLoading = false;
      },
      error: err => {
        this.toast.error('Erreur lors du chargement des données.', {
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
        this.isLoading = false;
      }
    });
  }

}
