import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  preferencesForm: any;
  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');
  isSaving = false;

  constructor(private adminsService: AdminsService) {
    this.preferencesForm = new FormGroup({
      showPercentagesOnCharts: new FormControl(this.userPreferences.showPercentagesOnCharts ?? false),
      showLegendOnCharts: new FormControl(this.userPreferences.showLegendOnCharts ?? false),
    });
  }

  ngOnInit(): void {}

  onSave() {
    this.isSaving = true;

    this.adminsService.saveUserPreferences(this.preferencesForm.value).subscribe({
      next: data => {
        if (data.userPreferences) {
          localStorage.setItem('userPreferences', JSON.stringify(data.userPreferences));
          this.userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');
        } else {
          console.log(data); // TODO : handle error with a toast
        }
      },
      error: err => console.error('An error occurred :', err),
      complete: () => this.isSaving = false
    });
  }
}
