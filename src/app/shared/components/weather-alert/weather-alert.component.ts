import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-weather-alert',
    templateUrl: './weather-alert.component.html',
    styleUrls: ['./weather-alert.component.scss'],
})
export class WeatherAlertComponent implements OnInit {
    @Input() weatherAlertTitle: string;
    @Input() weatherAlertContent: string;
    @Input() weatherAlertExpiration: number;
    constructor() {}

    ngOnInit(): void {}
}