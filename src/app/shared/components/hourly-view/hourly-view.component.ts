import { Component, OnInit, Input } from '@angular/core';
import { DatetimeService } from 'src/app/core/services/datetime.service';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
    selector: 'app-hourly-view',
    templateUrl: './hourly-view.component.html',
    styleUrls: ['./hourly-view.component.scss']
})
export class HourlyViewComponent implements OnInit {

    constructor(public datetime: DatetimeService, public weather: WeatherService) { }

    @Input() hourlyWeather: any;
    @Input() weatherLocation: string;

    ngOnInit() {
        this.hourlyWeather.data.forEach(hour => {
            hour.time = this.datetime.getTimeOfDay(hour.time);
            hour.temperature = this.weather.getTemperatureFormat(hour.temperature);
        });
    }

}
