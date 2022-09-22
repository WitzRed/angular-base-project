import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {

  aluno: any = {};
  formSubs: Subscription;
  formMudou: boolean = false;

  onInput(){
    this.formMudou = true;
  }

  podeMudarRota(){
    if(this.formMudou){
      console.log(`form input mudou ${this.aluno.name}`);
      confirm('Tem certeza que deseja sair desta página');
    }
    return true;
  }

  podeDesativar(){
    return this.podeMudarRota();
  }

  constructor( private _route: ActivatedRoute, private _alunosService: AlunosService) {
    this.formSubs = this._route.params.subscribe(
      (params: any) => {
          this.aluno = this._alunosService.getAluno(params['id']);

          if(this.aluno === null){
            this.aluno = {};
          }
      }
    );
   }

  ngOnInit(): void {
    this.formSubs = this._route.params.subscribe(
      (params: any) => {
          this.aluno = this._alunosService.getAluno(params['id']);

          if(this.aluno === null){
            this.aluno = {};
          }
      }
    );
  }

  ngOnDestroy(){
    this.formSubs.unsubscribe();
  }

}
