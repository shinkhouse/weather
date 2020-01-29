import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DatetimeService {

    constructor() { }

    public dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    getTimeOfDay(timestamp) {
        const date = new Date(timestamp * 1000);
        let hour = date.getHours();
        const ampm = hour >= 12 ? 'pm' : 'am';
        hour = hour % 12;
        hour = hour ? hour : 12;
        return hour + '' + ampm;
    }

    getWeekDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const weekday = date.getDay();
        return this.dayNames[weekday];
    }

}

