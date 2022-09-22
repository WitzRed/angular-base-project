import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursosService } from '../cursos.service';

@Component({
  selector: 'cursos-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css'],
  providers: [CursosService]
})
export class CursoDetalheComponent implements OnInit {


  id: number = 0;
  curso: any;
  subsToCursoService: Subscription;

  constructor(private _route: ActivatedRoute,
              private _cursoService: CursosService,
              private _router: Router) { 

    this.subsToCursoService = this._route.params.subscribe(
      (params)=>{
        this.id = params['id'];

        this.curso = this._cursoService.getCursoById(this.id);

        if(this.curso == null){
          this._router.navigate(['/exercicios/cursos/curso-nao-encontrado']);
        }
      }
    );
    
  }

  ngOnInit(): void {
    this.subsToCursoService = this._route.params.subscribe(
      (params)=>{
        this.id = params['id'];

        this.curso = this._cursoService.getCursoById(this.id);

        if(this.curso == null){
          this._router.navigate(['/exercicios/naoEncontrado']);
        }
      }
    );
  }

  ngOnDestroy(){
    this.subsToCursoService.unsubscribe();
  }

}
