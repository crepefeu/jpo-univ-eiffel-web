import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private adminsService: AdminsService, private router: Router) {
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
          } else {
            console.log(data); // TODO : handle error with a toast
          }
        },
        error: err => console.error('An error occurred :', err),
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
