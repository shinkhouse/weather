import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HourlyViewComponent } from './shared/components/hourly-view/hourly-view.component';
import { TodaysSummaryComponent } from './shared/components/todays-summary/todays-summary.component';
import { WeeklyGlanceComponent } from './shared/components/weekly-glance/weekly-glance.component';
import { InfoMessageComponent } from './shared/components/info-message/info-message.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HourlyViewComponent,
    TodaysSummaryComponent,
    WeeklyGlanceComponent,
    InfoMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
