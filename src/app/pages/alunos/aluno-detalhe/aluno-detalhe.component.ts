import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  private alunoSubs: Subscription;
  aluno: any = {};

  mostrarBtnEditar: boolean = false;


  editarContato(){
    this._router.navigate(['/alunos',this.aluno.id.toString(),'editar']);
  }
  VoltarParaAlunos(){
    this._router.navigate(['/alunos']);
  }
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _authService: AuthService
              ) {
    // this.alunoSubs = this._route.params.subscribe(
    //   (params: any) => {
    //       this.aluno = this._alunosService.getAluno(params);
    //   }
    // )
    // this.alunoSubs = this._route.data.subscribe(
    //   (dataInfo) => {
    //   }
    // )
   }

  ngOnInit(): void {
    // this.alunoSubs = this._route.params.subscribe(
    //   (params: any) => {
    //       this.aluno = this._alunosService.getAluno(params['id']);
    //   }
    // );

    this.alunoSubs = this._route.data.subscribe(
      (dataInfo) => {
        this.aluno = dataInfo.aluno;
      }
    )

    this.mostrarBtnEditar = this._authService.isAdminUser();
  }

  ngOnDestroy(){
    this.alunoSubs.unsubscribe();
  }

}
