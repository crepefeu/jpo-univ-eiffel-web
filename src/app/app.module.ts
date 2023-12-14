import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Chart Modules
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgApexchartsModule } from 'ng-apexcharts';

// PrimeNG Modules
import { InputSwitchModule } from 'primeng/inputswitch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './app-sections/website/pages/home/home.component';
import { HeaderComponent } from './app-sections/website/components/header/header.component';
import { FooterComponent } from './app-sections/website/components/footer/footer.component';
import { EducationComponent } from './app-sections/website/pages/education/education.component';
import { AdminDashboardComponent } from './app-sections/dashboard/admin-dashboard/admin-dashboard.component';
import { OverviewComponent } from './app-sections/dashboard/pages/overview/overview.component';
import { IndexComponent } from './app-sections/website/index/index.component';
import { SignInComponent } from './app-sections/website/pages/sign-in/sign-in.component';
import { AttendeesComponent } from './app-sections/dashboard/pages/attendees/attendees.component';
import { SettingsComponent } from './app-sections/dashboard/pages/settings/settings.component';
import { DiplomasComponent } from './app-sections/dashboard/pages/diplomas/diplomas.component';
import { AttendeesAnalyticsComponent } from './app-sections/dashboard/pages/attendees/attendees-analytics/attendees-analytics.component';
import { AttendeesManageComponent } from './app-sections/dashboard/pages/attendees/attendees-manage/attendees-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    EducationComponent,
    AdminDashboardComponent,
    OverviewComponent,
    IndexComponent,
    SignInComponent,
    AttendeesComponent,
    SettingsComponent,
    DiplomasComponent,
    AttendeesAnalyticsComponent,
    AttendeesManageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    HighchartsChartModule,
    NgApexchartsModule,
    InputSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
