import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatetimeService } from 'src/app/core/services/datetime.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { IconService } from 'src/app/core/services/icon.service';

@Component({
    selector: 'app-hourly-view',
    templateUrl: './hourly-view.component.html',
    styleUrls: ['./hourly-view.component.scss']
})
export class HourlyViewComponent implements OnInit, OnChanges {

    constructor(public datetime: DatetimeService, public weather: WeatherService, public icons: IconService) { }

    @Input() hourlyWeather: any;
    @Input() weatherLocation: string;

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hourlyWeather && changes.hourlyWeather.currentValue) {
            changes.hourlyWeather.currentValue.data.forEach((hour) => {
                hour.time = this.datetime.getTimeOfDay(hour.time);
                hour.temperature = this.weather.getTemperatureFormat(hour.temperature);
                hour.icon = this.icons.getIconFromMapping(hour.icon);
            });
        }
    }

}
