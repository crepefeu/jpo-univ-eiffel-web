import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EducationComponent } from './pages/education/education.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'education', component: EducationComponent},
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: OverviewComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
