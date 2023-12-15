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

  activeTab = 'overview';
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

    // subscribe to url changes to update the active tab
    this.router.events.subscribe((val) => {
      if (this.router.url.includes('overview')) {
        this.activeTab = 'overview';
      }
      else if (this.router.url.includes('attendees')) {
        this.activeTab = 'attendees';
      } else if (this.router.url.includes('diplomas')) {
        this.activeTab = 'diplomas';
      } else if (this.router.url.includes('settings')) {
        this.activeTab = 'settings';
      }
    });
  }

  signOut() {
    this.adminsService.signOut()
    this.router.navigate(['']);
  }

  onToggleDarkMode(darkModeSwitch: any) {
    if (darkModeSwitch.checked) {
      localStorage.setItem('currentTheme', 'dark');
    } else {
      localStorage.setItem('currentTheme', 'light');
    }
    document.body.classList.toggle('dark-theme');
    this.sharedService.changeTheme(darkModeSwitch.checked);
  }
}
