import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app-sections/website/pages/home/home.component';
import { EducationComponent } from './app-sections/website/pages/education/education.component';
import { AdminDashboardComponent } from './app-sections/dashboard/admin-dashboard/admin-dashboard.component';
import { OverviewComponent } from './app-sections/dashboard/overview/overview.component';
import { IndexComponent } from './app-sections/website/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'education', component: EducationComponent},
    ]
  },
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
