import { Component, OnInit } from '@angular/core';
import { AttendeesService } from 'src/app/services/attendees.service';
import { ManageListTypes } from 'src/app/enums/manageListTypes.enum';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-attendees-manage',
  templateUrl: './attendees-manage.component.html',
  styleUrls: ['./attendees-manage.component.scss']
})
export class AttendeesManageComponent implements OnInit {

  attendeesData: any;
  listType: ManageListTypes = ManageListTypes.Attendees;

  constructor(private attendeesService: AttendeesService,
    private toast: HotToastService) { }

  ngOnInit(): void {
    this.attendeesService.getAllAttendees().subscribe({
      next: data => {
        this.attendeesData = data;
      },
      error: err => {
        this.toast.error('Une erreur est survenue lors du chargement des données.', {
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
    });
  }

}
