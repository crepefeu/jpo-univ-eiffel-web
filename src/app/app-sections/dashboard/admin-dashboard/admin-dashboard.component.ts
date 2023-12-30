import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from 'src/app/services/admins.service';
import { SharedService } from 'src/app/services/shared.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  activeTab = 'overview';
  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

  isHandheld = false;

  showSidebar = false;

  constructor(private adminsService: AdminsService,
    private router: Router,
    private responsive: BreakpointObserver) {
    this.responsive.observe(['(max-width: 768px)']).subscribe((state) => {
      if (state.matches) {
        this.isHandheld = true;
      } else {
        this.isHandheld = false;
      }
    });
    }

  ngOnInit(): void {
    if (this.userPreferences && this.userPreferences.defaultTheme == 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // toggle dark mode based on system preferences
        if (event.matches) {
          document.body.classList.toggle('dark-theme', true);
          localStorage.setItem('currentTheme', 'dark');
        } else {
          document.body.classList.toggle('dark-theme', false);
          localStorage.setItem('currentTheme', 'light');
        }
      });
    }

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
}
