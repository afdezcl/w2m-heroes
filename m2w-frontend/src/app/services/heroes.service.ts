import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero.interface';
import { HeroUpdate } from '../models/heroUpdate.interface';

@Injectable({
    providedIn: 'root'
})
export class HeroesService {


    constructor(private http: HttpClient) { }

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${environment.apiURL}heroes`);
    }

    getHeroById(id: number): Observable<Hero> {
        return this.http.get<Hero>(`${environment.apiURL}heroes/${id}`);
    }

    updateHero(idHero: number, heroToUpdate: HeroUpdate): Observable<Hero> {
        return this.http.patch<Hero>(`${environment.apiURL}heroes/${idHero}`, heroToUpdate);
    }

    deleteHero(idHero: number): Observable<{}>{
        return this.http.delete<{}>(`${environment.apiURL}heroes/${idHero}`);
    }
}