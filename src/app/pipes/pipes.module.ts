import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './url-sanitizer.pipe';



@NgModule({
  declarations: [SafePipe],
  imports: [
    CommonModule
  ],
  exports: [
    SafePipe
  ]
})
export class PipesModule { }
