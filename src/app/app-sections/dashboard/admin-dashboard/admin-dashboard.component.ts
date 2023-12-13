import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from 'src/app/services/admins.service';
import { OverviewComponent } from '../pages/overview/overview.component';
import { AttendeesComponent } from '../pages/attendees/attendees.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');
  isDarkMode = localStorage.getItem('currentTheme') === 'dark' ? true : false;

  constructor(private adminsService: AdminsService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    // toggle dark mode based on localstorage 
    if (localStorage.getItem('currentTheme') === 'dark') {
      document.body.classList.toggle('dark-theme', true);
    } else {
      document.body.classList.toggle('dark-theme', false);
    }
  }

  signOut() {
    this.adminsService.signOut()
    this.router.navigate(['']);
  }

  onToggleDarkMode($event: any) {
    if ($event.checked) {
      localStorage.setItem('currentTheme', 'dark');
    } else {
      localStorage.setItem('currentTheme', 'light');
    }
    document.body.classList.toggle('dark-theme');
    this.sharedService.changeTheme($event.checked);
  }
}
