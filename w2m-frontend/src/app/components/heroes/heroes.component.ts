import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.interface';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public heroes: Array<Hero>;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
      .subscribe((response: Hero[]) => {
        this.heroes = response;
      })
  }

}
