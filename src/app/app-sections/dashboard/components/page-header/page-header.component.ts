import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string = '';

  isDarkMode = localStorage.getItem('currentTheme') === 'dark' ? true : false;
  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    if (this.userPreferences && this.userPreferences.defaultTheme == 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // toggle dark mode based on system preferences
        if (event.matches) {
          this.isDarkMode = true;
        } else {
          this.isDarkMode = false;
        }
      });
    }
  }

  onToggleDarkMode(darkModeSwitch: HTMLInputElement) {
    if (darkModeSwitch.checked) {
      localStorage.setItem('currentTheme', 'dark');
    } else {
      localStorage.setItem('currentTheme', 'light');
    }
    document.body.classList.toggle('dark-theme');
    this.sharedService.changeTheme(darkModeSwitch.checked);
  }

}
