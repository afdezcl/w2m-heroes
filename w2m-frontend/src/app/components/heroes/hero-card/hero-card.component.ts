import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hero } from 'src/app/models/hero.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private dialog: MatDialog,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  deleteHero(heroId: number): void {
    const data: ConfirmDialogData = {
      title: 'Eliminar héroe',
      content: '¿Está seguro que desea eliminar este héroe?'
    };
    const dialogReference = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data
    });

    dialogReference.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(heroId)
          .subscribe();
      }
    });

  }

}
