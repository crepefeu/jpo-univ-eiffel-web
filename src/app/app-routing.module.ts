import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app-sections/website/pages/home/home.component';
import { EducationComponent } from './app-sections/website/pages/education/education.component';
import { AdminDashboardComponent } from './app-sections/dashboard/admin-dashboard/admin-dashboard.component';
import { OverviewComponent } from './app-sections/dashboard/pages/overview/overview.component';
import { IndexComponent } from './app-sections/website/index/index.component';
import { SignInComponent } from './app-sections/website/pages/sign-in/sign-in.component';
import { isAuth } from './guards/isAuth.guard';
import { AttendeesComponent } from './app-sections/dashboard/pages/attendees/attendees.component';
import { SettingsComponent } from './app-sections/dashboard/pages/settings/settings.component';
import { DiplomasComponent } from './app-sections/dashboard/pages/diplomas/diplomas.component';
import { AttendeesAnalyticsComponent } from './app-sections/dashboard/pages/attendees/attendees-analytics/attendees-analytics.component';
import { AttendeesManageComponent } from './app-sections/dashboard/pages/attendees/attendees-manage/attendees-manage.component';
import { DiplomasManageComponent } from './app-sections/dashboard/pages/diplomas/diplomas-manage/diplomas-manage.component';
import { DiplomasAnalyticsComponent } from './app-sections/dashboard/pages/diplomas/diplomas-analytics/diplomas-analytics.component';
import { FaqComponent } from './app-sections/website/pages/faq/faq.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { VirtualTourComponent } from './app-sections/website/pages/virtual-tour/virtual-tour.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'but-mmi', component: EducationComponent},
      { path: 'faq', component: FaqComponent},
      { path: 'admin/sign-in', component: SignInComponent},
      { path: 'virtual-tour', component: VirtualTourComponent}
    ]
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [isAuth()],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full'},
      { path: 'overview', component: OverviewComponent},
      { path: 'attendees', component: AttendeesComponent, children: [
        { path: '', redirectTo: 'analytics', pathMatch: 'full'},
        { path: 'analytics', component: AttendeesAnalyticsComponent},
        { path: 'manage', component: AttendeesManageComponent},
      ]},
      { path: 'diplomas', component: DiplomasComponent, children: [
        { path: '', redirectTo: 'analytics', pathMatch: 'full'},
        { path: 'analytics', component: DiplomasAnalyticsComponent},
        { path: 'manage', component: DiplomasManageComponent},
      ]},
      { path: 'settings', component: SettingsComponent},
    ]
  },
  //Wild Card Route for 404 request 
  { path: '**', pathMatch: 'prefix', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
