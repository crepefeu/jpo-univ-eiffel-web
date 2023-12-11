import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss']
})
export class AttendeesComponent implements OnInit {

  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

  constructor() { }

  ngOnInit(): void {
  }
}
