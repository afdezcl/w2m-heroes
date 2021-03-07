import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private heroesService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
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
}
