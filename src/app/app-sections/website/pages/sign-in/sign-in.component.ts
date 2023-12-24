import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  isSubmitting = false;
  form: any;
  submitted = false

  constructor(private adminsService: AdminsService,
    private router: Router,
    private toast: HotToastService) {
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
            this.router.navigate(['/admin/dashboard']);
            if (data.userPreferences && data.userPreferences.useDarkModeByDefault) {
              // set localstorage to dark mode
              localStorage.setItem('currentTheme', 'dark')

              // toggle dark mode
              document.body.classList.toggle('dark-theme', data.userPreferences.useDarkModeByDefault ?? false);
            } else {
              // set localstorage to light mode
              localStorage.setItem('currentTheme', 'light')
            }
          } else {
            console.log(data); // TODO : handle error with a toast
          }
        },
        error: err => {
          this.toast.error('Une erreur est survenue', {
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
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsDirty();
    });
  }
}
