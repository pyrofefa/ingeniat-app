import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentPipe } from '../moment.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MomentPipe, 
    FilterPipe 
  ],
  exports: [
    MomentPipe, 
    FilterPipe
  ]
})
export class PipesModule { }