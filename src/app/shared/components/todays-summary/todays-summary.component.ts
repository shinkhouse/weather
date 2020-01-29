import { Component, OnInit, Input } from '@angular/core';
import { DatetimeService } from 'src/app/core/services/datetime.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { IconService } from 'src/app/core/services/icon.service';

@Component({
    selector: 'app-todays-summary',
    templateUrl: './todays-summary.component.html',
    styleUrls: ['./todays-summary.component.scss']
})
export class TodaysSummaryComponent implements OnInit {

    constructor(public datetime: DatetimeService, public weather: WeatherService, public icons: IconService) { }

    @Input() currentWeather: any;
    @Input() weatherLocation: string;

    ngOnInit() {
        console.log(this.weatherLocation);
        this.currentWeather.temperature = this.weather.getTemperatureFormat(this.currentWeather.temperature);
        this.currentWeather.icon = this.icons.getIconFromMapping(this.currentWeather.icon);
    }

}
