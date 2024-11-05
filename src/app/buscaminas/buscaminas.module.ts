import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuadriculaComponent } from './cuadricula/cuadricula.component';
import { BuscaminasDashboarhComponent } from './buscaminas-dashboarh/buscaminas-dashboarh.component';



@NgModule({
  declarations: [
    CuadriculaComponent,
    BuscaminasDashboarhComponent
  ],
  imports: [
    CommonModule
  ],
  exports :[
    BuscaminasModule
  ]
})
export class BuscaminasModule { }
