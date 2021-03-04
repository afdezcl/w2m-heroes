import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HeroesService {


    constructor(private http: HttpClient) { }

    getHeroes() {
        return this.http.get(`${environment.apiURL}heroes`);
    }
}