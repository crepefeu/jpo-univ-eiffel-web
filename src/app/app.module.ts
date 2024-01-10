import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

// Material Modules
import { MatStepperModule } from '@angular/material/stepper';

// Chart Modules
import { HighchartsChartModule } from 'highcharts-angular';
import { NgApexchartsModule } from 'ng-apexcharts';

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
import { DiplomasAnalyticsComponent } from './app-sections/dashboard/pages/diplomas/diplomas-analytics/diplomas-analytics.component';
import { DiplomasManageComponent } from './app-sections/dashboard/pages/diplomas/diplomas-manage/diplomas-manage.component';
import { ManageListComponent } from './app-sections/dashboard/components/manage-list/manage-list.component';
import { PaginationComponent } from './app-sections/dashboard/components/pagination/pagination.component';
import { SearchPipe } from './pipes/search.pipe';
import { PageHeaderComponent } from './app-sections/dashboard/components/page-header/page-header.component';
import { ModalComponent } from './shared/components/modals/generic-modal/modal.component';
import { AddAttendeeFormComponent } from './app-sections/dashboard/components/add-attendee-form/add-attendee-form.component';
import { ModifyAttendeeFormComponent } from './app-sections/dashboard/components/modify-attendee-form/modify-attendee-form.component';
import { CardsComponent } from './app-sections/website/components/cards/cards.component';
import { MultiStepFormComponent } from './app-sections/website/components/multi-step-form/multi-step-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqComponent } from './app-sections/website/pages/faq/faq.component';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { AddDiplomaFormComponent } from './app-sections/dashboard/components/add-diploma-form/add-diploma-form.component';
import { AddDiplomaCategoryFormComponent } from './app-sections/dashboard/components/add-diploma-category-form/add-diploma-category-form.component';
import { ModifyDiplomaFormComponent } from './app-sections/dashboard/components/modify-diploma-form/modify-diploma-form.component';
import { ModifyDiplomaCategoryFormComponent } from './app-sections/dashboard/components/modify-diploma-category-form/modify-diploma-category-form.component';
import { ConfirmationModalComponent } from './shared/components/modals/confirmation-modal/confirmation-modal.component';
import { GenericDrawerComponent } from './shared/components/drawers/generic-drawer/generic-drawer.component';
import { ConfirmationDrawerComponent } from './shared/components/drawers/confirmation-drawer/confirmation-drawer.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { VirtualTourComponent } from './app-sections/website/pages/virtual-tour/virtual-tour.component';

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
    DiplomasAnalyticsComponent,
    DiplomasManageComponent,
    ManageListComponent,
    PaginationComponent,
    SearchPipe,
    PageHeaderComponent,
    ModalComponent,
    AddAttendeeFormComponent,
    ModifyAttendeeFormComponent,
    CardsComponent,
    MultiStepFormComponent,
    FaqComponent,
    AddDiplomaFormComponent,
    AddDiplomaCategoryFormComponent,
    ModifyDiplomaFormComponent,
    ModifyDiplomaCategoryFormComponent,
    ConfirmationModalComponent,
    GenericDrawerComponent,
    ConfirmationDrawerComponent,
    PageNotFoundComponent,
    VirtualTourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatStepperModule,
    HighchartsChartModule,
    NgApexchartsModule,
    BrowserAnimationsModule
  ],
  providers: [provideHotToastConfig()],
  bootstrap: [AppComponent]
})
export class AppModule { }
