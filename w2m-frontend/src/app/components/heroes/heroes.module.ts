import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    HeroesRoutingModule,
    NgxPaginationModule,
    FlexLayoutModule,

    MatCardModule,
    MatButtonModule
  ],
  declarations: [HeroesComponent]
})
export class HeroesModule { }
