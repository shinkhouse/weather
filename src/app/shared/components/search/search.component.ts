import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/core/services/maps.service';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    constructor(public maps: MapsService, public storage: StorageService, public fb: FormBuilder, public dialogRef: MatDialogRef<SearchComponent>) { }

    public locations: any = [];

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

    getRecentHistory() {
        if (this.storage.getStorageItemByKey('search_history')) {
            this.locations = JSON.parse(this.storage.getStorageItemByKey('search_history'));
        }
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

    searchFieldDisplay(locationName) {
        return locationName ? locationName.name : undefined;
    }

    clearSearchField() {
        this.searchForm.reset();
    }

    search() {
        this.dialogRef.close(this.searchForm.controls.searchInput.value);
    }

    cancel() {
        this.dialogRef.close();
    }

}
