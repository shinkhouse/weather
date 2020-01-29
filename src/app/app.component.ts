import { Component, OnInit } from '@angular/core';
import { WeatherService } from './core/services/weather.service';
import { MapsService } from './core/services/maps.service';
import { StorageService } from './core/services/storage.service';
import { Subject } from 'rxjs';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger
} from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchComponent } from './shared/components/search/search.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('listStagger', [
            transition('* <=> *', [
                query(
                    ':enter',
                    [
                        style({ opacity: 0, transform: 'translateY(-15px)' }),
                        stagger(
                            '20ms',
                            animate(
                                '550ms ease-out',
                                style({ opacity: 1, transform: 'translateY(0px)' })
                            )
                        )
                    ],
                    { optional: true }
                ),
                query(':leave', animate('20ms', style({ opacity: 0 })), {
                    optional: true
                })
            ])
        ])
    ]
})
export class AppComponent implements OnInit {
    public title = 'weather';
    public forecast: any;
    public locations: any = [];
    public selectedLocation: string;
    subject: Subject<any> = new Subject();
    constructor(public weather: WeatherService, public maps: MapsService, public storage: StorageService, private fb: FormBuilder, public dialog: MatDialog) { }

    public searchForm: FormGroup;
    public loading: boolean;

    ngOnInit() {
        this.getRecentHistory();
        this.searchForm = this.fb.group({
            searchInput: null
        });

        this.searchForm
            .get('searchInput')
            .valueChanges
            .pipe(
                debounceTime(300)
            )
            .subscribe(value => {
                if (value) {
                    this.getPlacesAutocompleteByLocationKeyword(value);
                } else {
                    this.getRecentHistory();
                }
            });
        // this.getCoordinatesByLocationName('Houston, TX');
        // this.getWeather(42.3601, -71.0589);
    }

    getWeather(location) {
        this.addLocationToRecentHistory(location);
        this.selectedLocation = location.name;
        const geocodeParams = {
            address: this.selectedLocation
        };
        this.maps.getOpenCageGeocodeByAddress(geocodeParams).subscribe(
            address => {
                const coordinates = address.results[0].geometry;
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
        this.locations = [];
        const params = {
            address: location,
            types: '(cities)'
        };
        this.maps.getPlacesAutocomplete(params).subscribe(
            data => {
                if (data) {
                    console.log(data);
                    data.predictions.forEach(prediction => {
                        console.log(prediction);
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

    addLocationToRecentHistory(location) {
        location.type = 'recent';
        if (this.storage.getStorageItemByKey('search_history')) {
            let searchHistory = JSON.parse(this.storage.getStorageItemByKey('search_history'));
            searchHistory.push(location);
            searchHistory = searchHistory.reduce((acc, current) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            this.storage.setStorageItem('search_history', JSON.stringify(searchHistory));
        } else {
            const searchHistory = [];
            searchHistory.push(location);
            this.storage.setStorageItem('search_history', JSON.stringify(searchHistory));
        }
    }

    searchFieldDisplay(locationName) {
        return locationName ? locationName.name : undefined;
    }

    getRecentHistory() {
        if (this.storage.getStorageItemByKey('search_history')) {
            this.locations = JSON.parse(this.storage.getStorageItemByKey('search_history'));
        }
    }

    openSearchDialog() {
        const dialogRef = this.dialog.open(SearchComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '100%',
            width: '100%'
        });
    }

    clearSearchField() {
        this.searchForm.reset();
    }

}
