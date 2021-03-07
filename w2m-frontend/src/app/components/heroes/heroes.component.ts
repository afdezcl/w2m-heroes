import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from 'src/app/models/hero.interface';
import { HeroesService } from 'src/app/services/heroes/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public heroes: Array<Hero>;
  public pageActual = 1;
  public searchControl: FormControl;

  constructor(
    private heroesService: HeroesService,
    private router: Router
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.getHeroes();
    this.searchHero();
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
      .subscribe((response: Hero[]) => {
        this.heroes = response;
      });
  }

  goToAddHero(): void {
    this.router.navigateByUrl('add-hero');
  }

  removeHeroFromList(heroId: number): void {
    this.heroes.filter((hero: Hero) => hero.id !== heroId);
  }

  searchHero(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(val => {
          return this.heroesService.searchHero(val);
        })
      ).subscribe((response: Hero[]) => {
        this.heroes = response;
      });
  }


}
