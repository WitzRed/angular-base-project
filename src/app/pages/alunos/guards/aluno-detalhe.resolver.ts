import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Aluno } from "../aluno";
import { AlunosService } from "../alunos.service";

@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno>{
    constructor( private _alunosService: AlunosService ){ }

    resolve (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any{

       let id = route.params['id'];
       console.log(id)

       return this._alunosService.getAluno(id);
    }
}