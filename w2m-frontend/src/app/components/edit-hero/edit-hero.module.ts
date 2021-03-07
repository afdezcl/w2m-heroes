import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditHeroComponent } from './edit-hero.component';
import { EditHeroRoutingModule } from './edit-hero-routing.module';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/ui-controls/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditHeroRoutingModule,
    DirectivesModule,
    FlexLayoutModule,

    MatInputModule,
    MatButtonModule
  ],
  declarations: [EditHeroComponent]
})
export class EditHeroModule { }
