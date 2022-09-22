import { Component, OnInit } from '@angular/core';

import {CursosService} from '../cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers:[CursosService]
})
export class CursosComponent implements OnInit {
  nomePortal: string;

  cursos: any[] = [];

  constructor(private _cursoService: CursosService ) { 
    this.nomePortal = 'http://witzred.blogspot.com/'

  }

  ngOnInit(): void { 
    this.cursos = this._cursoService.getCursos();

    CursosService.emitirNovoCursoCriado.subscribe(
      curso => this.cursos.push(curso)
    );
  }

}
