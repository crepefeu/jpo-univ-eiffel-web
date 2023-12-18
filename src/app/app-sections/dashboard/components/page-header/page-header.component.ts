import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input() title: string = '';

  constructor(private sharedService: SharedService) {}

  isDarkMode = localStorage.getItem('currentTheme') === 'dark' ? true : false;

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
