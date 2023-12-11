import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  togglePercentagesOnCharts() {
    environment.showPercentagesOnCharts = !environment.showPercentagesOnCharts;
    console.log(environment.showPercentagesOnCharts);
  }
}
