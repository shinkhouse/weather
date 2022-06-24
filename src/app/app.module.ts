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
import { SearchComponent } from './shared/components/search/search.component';
import { HourlyGraphComponent } from './shared/components/hourly-graph/hourly-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WeatherIconComponent } from './shared/components/weather-icon/weather-icon.component';
import { WeatherAlertComponent } from './shared/components/weather-alert/weather-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HourlyViewComponent,
    TodaysSummaryComponent,
    WeeklyGlanceComponent,
    InfoMessageComponent,
    SearchComponent,
    HourlyGraphComponent,
    WeatherIconComponent,
    WeatherAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule,
  ],
  entryComponents: [
      SearchComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
