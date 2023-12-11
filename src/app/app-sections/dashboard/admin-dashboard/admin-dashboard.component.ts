import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  constructor(private adminsService: AdminsService, private router: Router) {}

  signOut() {
    this.adminsService.signOut()
    this.router.navigate(['']);
  }

}
