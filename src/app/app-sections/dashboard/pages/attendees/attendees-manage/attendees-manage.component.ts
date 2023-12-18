import { Component, OnInit } from '@angular/core';
import { AttendeesService } from 'src/app/services/attendees.service';
import { ManageListTypes } from 'src/app/enums/manageListTypes.enum';

@Component({
  selector: 'app-attendees-manage',
  templateUrl: './attendees-manage.component.html',
  styleUrls: ['./attendees-manage.component.scss']
})
export class AttendeesManageComponent implements OnInit {

  attendeesData: any;
  listType: ManageListTypes = ManageListTypes.Attendees;

  constructor(private attendeesService: AttendeesService) { }

  ngOnInit(): void {
    this.attendeesService.getAllAttendees().subscribe({
      next: data => {
        this.attendeesData = data;
      },
      error: err => console.error('An error occurred :', err)
    });
  }

}
