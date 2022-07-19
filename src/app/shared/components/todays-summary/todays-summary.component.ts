import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DatetimeService } from 'src/app/core/services/datetime.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { IconService } from 'src/app/core/services/icon.service';
import { listStagger } from 'src/app/core/animations/list-stagger.animation';

@Component({
    selector: 'app-todays-summary',
    templateUrl: './todays-summary.component.html',
    styleUrls: ['./todays-summary.component.scss'],
    animations: [listStagger]
})
export class TodaysSummaryComponent implements OnInit, OnChanges {

    constructor(public datetime: DatetimeService, public weather: WeatherService, public icons: IconService) { }

    @Input() currentWeather: any;
    @Input() weatherLocation: string;
    public currentDate: Date = new Date();

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.currentWeather && changes.currentWeather.currentValue) {
            const currentWeather = changes.currentWeather.currentValue;
            currentWeather.temperature = this.weather.getTemperatureFormat(currentWeather.temperature);
            currentWeather.icon = this.icons.getIconFromMapping(currentWeather.icon);
        }
    }

}
