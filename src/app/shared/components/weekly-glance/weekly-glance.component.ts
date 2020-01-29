import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { DatetimeService } from 'src/app/core/services/datetime.service';

@Component({
    selector: 'app-weekly-glance',
    templateUrl: './weekly-glance.component.html',
    styleUrls: ['./weekly-glance.component.scss']
})
export class WeeklyGlanceComponent implements OnInit {

    constructor(public weather: WeatherService, public datetime: DatetimeService) { }

    @Input() dailyWeather: any;
    @Input() weatherLocation: string;

    ngOnInit() {
        this.dailyWeather.data.forEach(day => {
            day.time = this.datetime.getWeekDate(day.time);
            day.temperatureHigh = this.weather.getTemperatureFormat(day.temperatureHigh);
            day.temperatureLow = this.weather.getTemperatureFormat(day.temperatureLow);
        });
    }

}
