import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { DatetimeService } from 'src/app/core/services/datetime.service';
import { IconService } from 'src/app/core/services/icon.service';

@Component({
    selector: 'app-weekly-glance',
    templateUrl: './weekly-glance.component.html',
    styleUrls: ['./weekly-glance.component.scss']
})
export class WeeklyGlanceComponent implements OnInit, OnChanges {

    constructor(public weather: WeatherService, public datetime: DatetimeService, public icons: IconService) { }

    @Input() dailyWeather: any;
    @Input() weatherLocation: string;

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.dailyWeather && changes.dailyWeather.currentValue) {
            changes.dailyWeather.currentValue.data.forEach((day) => {
                day.time = this.datetime.getWeekDate(day.time);
                day.temperatureHigh = this.weather.getTemperatureFormat(day.temperatureHigh);
                day.temperatureLow = this.weather.getTemperatureFormat(day.temperatureLow);
                day.icon = this.icons.getIconFromMapping(day.icon);
            });
        }
    }

}
