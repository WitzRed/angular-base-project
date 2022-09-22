import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CursosModule } from './cursos/cursos.module';
import { MeuFormModule } from './forms/meu-form/meu-form.module';

import { GaleriaService } from './galeria/galeria.service';
import { LogService } from 'src/app/services/log.service';

import { FundoAmareloDirective } from 'src/app/directives/fundo-amarelo.directive';
import { HighlightMouseDirective } from 'src/app/directives/highlight-mouse.directive';
import { NgElseDirective } from 'src/app/directives/ng-else.directive';


import { FiltroArrayPipe } from 'src/app/pipes/filtro-array.pipe';
import { CamelCasePipe } from 'src/app/pipes/camel-case.pipe';


import { ExerciciosComponent } from './exercicios.component';
import { CicloComponent } from './ciclo/ciclo.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { DiretivasCustomizadasComponent } from './diretivas-customizadas/diretivas-customizadas.component';
import { ForloopPageComponent } from './forloop-page/forloop-page.component';
import { InputPropertyComponent } from './input-property/input-property.component';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { MeuSegundoComponent } from './meu-segundo/meu-segundo.component';
import { OutputPropertyComponent } from './output-property/output-property.component';
import { SwitchPageComponent } from './switch-page/switch-page.component';
import { HightlightDirective } from 'src/app/directives/hightlight.directive';
import { ExerciciosRoutingModule } from './exercicios-routing.module';


@NgModule({
  declarations: [
    FundoAmareloDirective,
    HighlightMouseDirective,
    HightlightDirective,
    NgElseDirective,
    FiltroArrayPipe,
    CamelCasePipe,
    ExerciciosComponent, 
    MeuPrimeiroComponent,
    MeuSegundoComponent,
    InputPropertyComponent,
    OutputPropertyComponent,
    DataBindingComponent,
    ForloopPageComponent,
    SwitchPageComponent,
    GaleriaComponent,
    CicloComponent,
    DiretivasCustomizadasComponent,
    ExemplosPipesComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    CursosModule,
    MeuFormModule,
    ExerciciosRoutingModule
  ],
  exports: [
    MeuFormModule,
    FundoAmareloDirective,
    HighlightMouseDirective,
    HightlightDirective,
    NgElseDirective,
    FiltroArrayPipe,
    CamelCasePipe,
    ExerciciosComponent, 
    MeuPrimeiroComponent,
    MeuSegundoComponent,
    InputPropertyComponent,
    OutputPropertyComponent,
    DataBindingComponent,
    ForloopPageComponent,
    SwitchPageComponent,
    GaleriaComponent,
    CicloComponent,
    DiretivasCustomizadasComponent,
    ExemplosPipesComponent
  ],
  providers: [
    GaleriaService,
    LogService
  ]
})
export class ExerciciosModule { }
