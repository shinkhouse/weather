import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class IconService {

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'sunny',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sunny.svg'));
        iconRegistry.addSvgIcon(
            'partly-cloudy',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/partly-cloudy.svg'));
        iconRegistry.addSvgIcon(
            'windy',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/windy.svg'));
        iconRegistry.addSvgIcon(
            'cloudy',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
        iconRegistry.addSvgIcon(
            'rainy',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rainy.svg'));
        iconRegistry.addSvgIcon(
            'thunderstorms',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/thunderstorms.svg'));
        iconRegistry.addSvgIcon(
            'snowy',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/snowy.svg'));

        iconRegistry.addSvgIcon(
            'clear-night',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear-night.svg'));
    }

    public iconMapping = {
        'clear-day': 'sunny',
        'clear-night': 'clear-night',
        rain: 'rainy',
        snow: 'snowy',
        sleet: 'sleet',
        wind: 'windy',
        fog: 'foggy',
        cloudy: 'cloudy',
        'partly-cloudy-day': 'partly-cloudy',
        'partly-cloudy-night': 'partly-cloudy',
        hail: 'hail',
        thunderstorm: 'thunderstorms',
        tornado: 'tornado'
    };

    getIconFromMapping(icon: string) {
        return this.iconMapping[icon];
    }

}
