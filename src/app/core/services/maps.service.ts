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
        const url =
            `https://api.samuelhinkhouse.com/maps/api/place/autocomplete/json?` +
            `input=${params.address}&types=${params.types}`;

        return this.http.get(url)
            .pipe(
                tap(weather => weather),
                catchError(this.handleError('getWeather', []))
            );
    }

    getGeocodeByAddress(params) {
        const url = `https://api.samuelhinkhouse.com/maps/api/geocode/json?` + `address=${params.address}`;

        return this.http.get<any>(url)
            .pipe(
                tap(weather => weather),
                catchError(this.handleError('getWeather', []))
            );
    }

    getOpenCageGeocodeByAddress(params) {
        const url = `https://api.samuelhinkhouse.com/geocode/v1/json?q=?` + `q=${params.address}`;

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
