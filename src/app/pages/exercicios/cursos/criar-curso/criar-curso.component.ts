import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';



@Component({
  selector: 'criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.css'],
  providers:[CursosService]
})
export class CriarCursoComponent implements OnInit {
  cursos: any[] = [];
  constructor(private _cursosService: CursosService) { }


  ngOnInit(): void {
  }

  onCriarCurso(curso: string){
    this._cursosService.criarCurso(curso);
    this.cursos = this._cursosService.getCursos();
  }
  onAddExistingCurso(){
    this._cursosService.addCurso();
    this.cursos = this._cursosService.getCursos();
  }
}
