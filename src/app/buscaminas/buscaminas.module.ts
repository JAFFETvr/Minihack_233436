import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuadriculaComponent } from './cuadricula/cuadricula.component';
import { FormsModule } from '@angular/forms'; 

import { BuscaminasDashboarhComponent } from './buscaminas-dashboarh/buscaminas-dashboarh.component';


@NgModule({
  declarations: [
    CuadriculaComponent,
    BuscaminasDashboarhComponent
  ],
  imports: [
    CommonModule ,
    FormsModule
  ],
  exports: [
    CuadriculaComponent,
    BuscaminasDashboarhComponent
  ]
})
export class BuscaminasModule { }