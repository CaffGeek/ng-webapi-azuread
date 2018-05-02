import { EveryoneComponent } from './everyone/everyone.component';
import { EveryoneRoutingModule } from './everyone-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    EveryoneRoutingModule
  ],
  declarations: [
    EveryoneComponent
  ]
})
export class EveryoneModule { }
