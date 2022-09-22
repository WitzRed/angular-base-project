import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
// import { CursosService } from './cursos.service';
import { CriarCursoComponent } from './criar-curso/criar-curso.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosRoutingModule } from './cursos-routing.module';

@NgModule({
  declarations: [
    CursosComponent,
    CursoDetalheComponent,
    CriarCursoComponent,
    CursoNaoEncontradoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ],
  exports:[
    CursosComponent,
    CriarCursoComponent
  ],
  providers: [
    // CursosService
  ]
})
export class CursosModule { }
