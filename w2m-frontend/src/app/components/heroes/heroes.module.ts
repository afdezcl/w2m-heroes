import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderModule } from '../loader/loader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule,
    NgxPaginationModule,
    FlexLayoutModule,
    LoaderModule,
    FormsModule, ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  declarations: [
    HeroesComponent,
    HeroCardComponent
  ]
})
export class HeroesModule { }
