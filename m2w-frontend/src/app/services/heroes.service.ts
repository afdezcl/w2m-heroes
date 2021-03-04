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

    getHeroById(id: number) {
        return this.http.get(`${environment.apiURL}heroes/${id}`);
    }

    updateHero(idHero: number, heroToUpdate) {
        return this.http.patch(`${environment.apiURL}heroes/${idHero}`, heroToUpdate);
    }

    deleteHero(idHero: number) {
        return this.http.delete(`${environment.apiURL}heroes/${idHero}`);
    }
}