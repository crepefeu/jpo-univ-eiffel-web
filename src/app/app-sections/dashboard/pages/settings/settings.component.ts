import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { defaultSuccessToastConfig, defaultErrorToastConfig } from 'src/app/configs/default-toast.configs';
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
    this.responsive.observe(['(max-width: 820px)']).subscribe({
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
          if (this.isHandheld) {
            this.toast.error(data.message, {
              ...defaultErrorToastConfig,
              style: {
                ...defaultErrorToastConfig.style,
                fontSize: '0.8rem',
                position: 'absolute',
                bottom: '65px',
              }
            });
          } else {
            this.toast.error(data.message, {
              ...defaultErrorToastConfig
            });
          }
        } else if (data.status == 'success' && data.userPreferences) {
          localStorage.setItem('userPreferences', JSON.stringify(data.userPreferences));
          this.userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

          if (this.isHandheld) {
            this.toast.success(data.message, {
              ...defaultSuccessToastConfig,
              style: {
                ...defaultSuccessToastConfig.style,
                fontSize: '0.8rem',
                position: 'absolute',
                bottom: '65px',
              }
            });
          } else {
            this.toast.success(data.message, {
              ...defaultSuccessToastConfig
            });
          }
        } else {
          if (this.isHandheld) {
            this.toast.error('Une erreur est survenue', {
              ...defaultSuccessToastConfig,
              style: {
                ...defaultSuccessToastConfig.style,
                fontSize: '0.8rem',
                position: 'absolute',
                bottom: '65px',
              }
            });
          } else {
            this.toast.error('Une erreur est survenue', {
              ...defaultSuccessToastConfig
            });
          }
        }
      },
      error: err => {
        if (this.isHandheld) {
          this.toast.error('Une erreur est survenue', {
            ...defaultErrorToastConfig,
            style: {
              ...defaultErrorToastConfig.style,
              fontSize: '0.8rem',
              position: 'absolute',
              bottom: '65px',
            }
          });
        } else {
          this.toast.error('Une erreur est survenue', {
            ...defaultErrorToastConfig
          });
        }
        this.isSaving = false
      },
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
