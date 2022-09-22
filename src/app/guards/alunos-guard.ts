import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { AuthService } from "../pages/login/auth.service";

@Injectable()
export class AlunosGuard implements CanActivateChild {

    constructor(private _authService: AuthService){}
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | boolean{
        console.log('Guarda de rota filha alunos');
        console.log(route);
        console.log(state);

        if(state.url.includes('editar') && !this._authService.isAdminUser()){
            alert('Usuario sem Acesso');
            return of(false);
        }else{
            return of(true);
        }

        return true;
    }
}