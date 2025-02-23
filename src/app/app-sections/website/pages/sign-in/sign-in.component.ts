import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { defaultErrorToastConfig } from 'src/app/configs/default-toast.configs';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  isHandheld = false;

  isSubmitting = false;
  form: FormGroup;
  submitted = false

  constructor(private adminsService: AdminsService,
    private router: Router,
    private toast: HotToastService,
    private responsive: BreakpointObserver) {
    this.responsive.observe(['(max-width: 820px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandheld = true;
        } else {
          this.isHandheld = false;
        }
      }
    });

    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {

    this.submitted = false;

    if (this.form.valid) {
      this.isSubmitting = true;

      this.adminsService.signIn(this.form.value).subscribe({
        next: data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('displayName', data.displayName);
            localStorage.setItem('userPreferences', JSON.stringify(data.userPreferences));
            this.router.navigate(['dashboard']);
            if (data.userPreferences && data.userPreferences.defaultTheme == 'dark') {
              // set localstorage to dark mode
              localStorage.setItem('currentTheme', 'dark')

              // toggle dark mode
              document.body.classList.toggle('dark-theme', true);
            } else if (data.userPreferences && data.userPreferences.defaultTheme == 'light') {
              // set localstorage to light mode
              localStorage.setItem('currentTheme', 'light')
            } else if (data.userPreferences && data.userPreferences.defaultTheme == 'system') {
              // set localstorage to system mode
              localStorage.setItem('currentTheme', 'system')

              if (window.matchMedia) {
                // Check if the dark-mode Media-Query matches
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  // set localstorage to dark mode
                  localStorage.setItem('currentTheme', 'dark')

                  // toggle dark mode
                  document.body.classList.toggle('dark-theme', true);
                } else {
                  // set localstorage to light mode
                  localStorage.setItem('currentTheme', 'light')
                }
              } else {
                // set localstorage to light mode
                localStorage.setItem('currentTheme', 'light')
              }
            }
          } else {
            if (this.isHandheld) {
              this.toast.error(data.message, {
                ...defaultErrorToastConfig,
                style: {
                  ...defaultErrorToastConfig.style,
                  fontSize: '0.8rem',
                  position: 'absolute',
                  bottom: '0',
                }
              });
            } else {
              this.toast.error(data.message, {
                ...defaultErrorToastConfig
              });
            }
            this.isSubmitting = false;
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
                bottom: '0',
              }
            });
          } else {
            this.toast.error('Une erreur est survenue', {
              ...defaultErrorToastConfig
            });
          }
          this.isSubmitting = false;
        },
        complete: () => this.isSubmitting = false
      });
    } else {
      this.submitted = true;
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: FormControl) => {
      control.markAsDirty();
    });
  }
}
