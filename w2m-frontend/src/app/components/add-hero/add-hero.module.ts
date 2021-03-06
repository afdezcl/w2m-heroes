import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHeroComponent } from './add-hero.component';
import { AddHeroRoutingModule } from './add-hero-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    AddHeroRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    // MATERIAL
    MatButtonModule,
    MatInputModule
  ],
  declarations: [AddHeroComponent]
})
export class AddHeroModule { }
