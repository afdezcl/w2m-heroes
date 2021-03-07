import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,

    // Material
    MatProgressSpinnerModule
  ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent]
})
export class LoaderModule { }
