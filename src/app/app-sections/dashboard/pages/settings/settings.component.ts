import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  title = "Paramètres";

  preferencesForm: any;
  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');
  isSaving = false;

  constructor(private adminsService: AdminsService,
    private toast: HotToastService) {
    this.preferencesForm = new FormGroup({
      showPercentagesOnCharts: new FormControl(this.userPreferences.showPercentagesOnCharts ?? false),
      showLegendOnCharts: new FormControl(this.userPreferences.showLegendOnCharts ?? false),
      useDarkModeByDefault: new FormControl(this.userPreferences.useDarkModeByDefault ?? false)
    });
  }

  ngOnInit(): void {}

  onSave() {
    this.isSaving = true;

    this.adminsService.saveUserPreferences(this.preferencesForm.value).subscribe({
      next: data => {
        if (data.status == 'error') {
          this.toast.error(data.message, {
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
          return;
        } else if (data.status == 'success' && data.userPreferences) {
          localStorage.setItem('userPreferences', JSON.stringify(data.userPreferences));
          this.userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

          this.toast.success(data.message, {
            duration: 4000,
            position: 'bottom-center',
            style: {
              backgroundColor: 'var(--toast-bkg)',
              color: 'var(--toast-txt)',
              borderRadius: '30px',
              border: '1.5px solid var(--toast-success)',
              fontWeight: '400',
              padding: '3px 10px'
            }
          });
        } else {
          this.toast.error('Une erreur est survenue lors de l\'enregistrement.', {
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
      },
      error: err => console.error('An error occurred :', err),
      complete: () => this.isSaving = false
    });
  }
}
