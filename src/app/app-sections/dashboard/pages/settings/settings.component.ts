import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isHandheld = false;

  title = "Paramètres";

  preferencesForm: FormGroup;
  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');
  isSaving = false;

  selectedTheme = this.userPreferences.defaultTheme ?? 'system';

  constructor(private adminsService: AdminsService,
    private toast: HotToastService,
    private responsive: BreakpointObserver,
    private router: Router) {
    this.responsive.observe(['(max-width: 500px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandheld = true;
        } else {
          this.isHandheld = false;
        }
      }
    });
    this.preferencesForm = new FormGroup({
      showPercentagesOnCharts: new FormControl(this.userPreferences.showPercentagesOnCharts ?? false),
      showLegendOnCharts: new FormControl(this.userPreferences.showLegendOnCharts ?? false)
    });
  }

  ngOnInit(): void { }

  onSave() {
    this.isSaving = true;

    let newUserPreferences = {
      defaultTheme: this.selectedTheme,
      showPercentagesOnCharts: this.preferencesForm.value.showPercentagesOnCharts,
      showLegendOnCharts: this.preferencesForm.value.showLegendOnCharts
    };

    this.adminsService.saveUserPreferences(newUserPreferences).subscribe({
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

  switchSelectedTheme(theme: string) {
    if (theme == 'dark') {
      // set localstorage to dark mode
      this.selectedTheme = 'dark';
    } else if (theme == 'light') {
      // set localstorage to light mode
      this.selectedTheme = 'light';
    } else if (theme == 'system') {
      // set localstorage to system mode
      this.selectedTheme = 'system';
    }
  }

  signOut() {
    this.adminsService.signOut()
    this.router.navigate(['']);
  }
}
