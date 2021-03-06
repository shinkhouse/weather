import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Geocode } from 'src/app/shared/models/geocode';

@Injectable({
    providedIn: 'root'
})
export class MapsService {

    constructor(private http: HttpClient) { }

    getPlacesAutocomplete(params): Observable<any> {
        const apiKey = environment.google_maps_api_key;
        const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
            `input=${params.address}&types=${params.types}&key=${apiKey}`;

        return this.http.get(url)
            .pipe(
                tap(weather => weather),
                catchError(this.handleError('getWeather', []))
            );
    }

    getGeocodeByAddress(params) {
        const apiKey = environment.google_maps_api_key;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?` +
            `address=${params.address}&key=${apiKey}`;

        return this.http.get<any>(url)
            .pipe(
                tap(weather => weather),
                catchError(this.handleError('getWeather', []))
            );
    }

    getOpenCageGeocodeByAddress(params) {
        const apiKey = environment.open_cage_api_key;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=?` +
            `q=${params.address}&key=${apiKey}`;

        return this.http.get<any>(url)
            .pipe(
                tap(weather => weather),
                catchError(this.handleError('getWeather', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

}
