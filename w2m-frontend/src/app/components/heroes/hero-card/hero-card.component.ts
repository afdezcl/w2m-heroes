import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.interface';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: Hero;
  @Output() heroIdDeleted = new EventEmitter<number>();

  constructor(
    private dialog: MatDialog,
    private heroesService: HeroesService,
    private router: Router
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
          .subscribe(() => {
            this.heroIdDeleted.emit(heroId);
          });
      }
    });
  }

  editHero(heroId: number): void {
    this.router.navigateByUrl(`/edit-hero/${heroId}`);
  }

}
