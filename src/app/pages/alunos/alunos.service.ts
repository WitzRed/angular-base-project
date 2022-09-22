import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  
  private alunos: Aluno[] = [
    {id: 1, name: 'Aluno 01', email:'aluno01@email.com'},
    {id: 2, name: 'Aluno 02', email:'aluno02@email.com'},
    {id: 3, name: 'Aluno 03', email:'aluno03@email.com'}
  ];

  getAlunos(){
    return this.alunos;
  }

  getAluno(id: number){
    const alunoInedx = this.alunos.map(al => al.id.toString()).indexOf(id.toString());
    if(id > -1){
      return this.alunos[alunoInedx];
    }
    return null;
  }
  constructor() { }
}
