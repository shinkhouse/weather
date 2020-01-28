import { Component, OnInit } from '@angular/core';
import { WeatherService } from './core/services/weather.service';
import { MapsService } from './core/services/maps.service';
import { StorageService } from './core/services/storage.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'weather';
    public forecast: any;
    public locations: any;
    public selectedLocation: string;
    subject: Subject<any> = new Subject();
    constructor(public weather: WeatherService, public maps: MapsService, public storage: StorageService) {}

    ngOnInit() {
        this.locations = [
            {
                name: 'Wapello, Iowa',
                type: 'recent'
            },
            {
                name: 'Houston, TX',
                type: 'recent'
            },
            {
                name: 'Salt Lake City, Utah',
                type: 'recent'
            }
        ];
        // this.getPlacesAutocompleteByLocationKeyword('Houston, TX');
        // this.getCoordinatesByLocationName('Houston, TX');
        // this.getWeather(42.3601, -71.0589);
    }

    getWeather(location) {
        // this.locations = [];
        const geocodeParams = {
            address: location
        };
        this.maps.getGeocodeByAddress(geocodeParams).subscribe(
            address => {
                const coordinates = address.results[0].geometry.location;
                const weatherParams = {
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                };

                this.weather.getDarkyWeather(weatherParams).subscribe(
                    data => {
                        console.log(data);
                        this.forecast = data;
                    },
                    error => {
                        console.error(error);
                    }
                );
            },
            error => {
                console.error(error);
            }
        );
    }

    getPlacesAutocompleteByLocationKeyword(location: string) {
        const params = {
            address: location,
            types: '(cities)'
        };
        this.maps.getPlacesAutocomplete(params).subscribe(
            data => {
                if (data) {
                    data.predictions.forEach(prediction => {
                        this.locations.push({
                            name: prediction.description,
                            type: 'search_query'
                        });
                    });
                }
                // this.forecast = data;
            },
            error => {
                console.error(error);
            }
        );
    }

    getWeatherTest(location) {
        console.log(location);
    }


}
