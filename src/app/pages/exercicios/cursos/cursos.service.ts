import { Injectable, EventEmitter } from '@angular/core';

import { LogService } from '../../../services/log.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  emitirCursoCriado = new EventEmitter<any>();
  static emitirNovoCursoCriado = new EventEmitter<any>()

  cursoProvider: any[] = [
                {id:'1' , name:'MATLAB'}, {id:'2' , name:'OBS'}, {id: '3', name:'Python'},
                {id:'4' , name:'C'}, {id: '5', name:'C++'}, {id:'6' , name:'Java'},
                {id:'7' , name:'Javascript'}, {id: '8', name:'R'}, {id: '9' , name:'Julia'},
                {id: '10', name:'Cotlin'}, {id: '11', name:'Angular'}, {id: '12', name:'HTML5'},
                {id: '13' , name:'CSS'},{id: '14' , name:'NodeJS'}, {id: '15' , name:'Swift'}, 
                {id:'16' , name:'Lua'}, {id: '17' , name:'Pseudocode'}
              ];

  private novoCurso: any = {id: null, name: null};

  private cursos: any[] = [];

  private index = 0;

  constructor(private _logService: LogService) {}

  getCursos(){
    this._logService.eventLog('Obtendo lista de cursos...');
    this._logService.eventLog(`Enviando lista de ${this.cursos.length} cursos`);
    return this.cursos;
  }

  getCursoById(id: number){
    let cursos = this.cursoProvider;//this.getCursos();
    for(let i = 0; i< cursos.length; i++){
      let curso = cursos[i];
      if(curso.id == id){
        return curso;
      }
    }
    return null;
  }

  addCurso(){
        
    let indexCurso = 0;
    let indexCursoProvider = 0;

    this._logService.eventLog('Adicionando curso do preset de cursos...');
    this.novoCurso = this.cursoProvider.length>0?this.addFromProvider():{id: '1', name:''};
    this._logService.eventLog(`Preset encontrado ${this.novoCurso.name}`);


    indexCurso = this.cursos.map(cs => cs.name).indexOf(this.novoCurso.name);
  

    if (indexCurso > -1) {
      indexCursoProvider = this.cursoProvider.map(cs => cs.name).indexOf(this.novoCurso.name);
      this.cursoProvider.splice(indexCursoProvider,1);
    }else{
      this.cursos.push(this.novoCurso);
      this._logService.eventLog(`Curso ${this.novoCurso.id} adicionado`);
    }
  }

  addFromProvider(){
    this.index = this.getRandomInt(0,this.cursoProvider.length);
    return this.cursoProvider[this.index];
  }

  criarCurso(curso:string){
    this._logService.eventLog(`Criando novo curso ${ curso }`);
    const indexCurso = this.cursos.map(cs => cs.name).indexOf('');
    if (indexCurso > -1) {
      this.cursos[indexCurso] = {id: indexCurso.toString(), name: curso};

      this.emitirCursoCriado.emit({id:  indexCurso.toString(), name: curso});
      CursosService.emitirNovoCursoCriado.emit({id: indexCurso.toString(), name: curso});
    }else{
      this.cursos.push( {id: (this.cursos.length).toString(), name: curso});
      this.emitirCursoCriado.emit({id:  (this.cursos.length).toString(), name: curso});
      CursosService.emitirNovoCursoCriado.emit({id:  (this.cursos.length).toString(), name: curso});
    }

  }

  getRandomInt(min:number, max:number){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random()* (max - min) + min);
  }
}
