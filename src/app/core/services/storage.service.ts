import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

constructor() { }
    getStorageItemByKey(key: string) {
        return localStorage.getItem(key);
    }

    setStorageItem(key: string, value) {
        localStorage.setItem(key, value);
    }
}
