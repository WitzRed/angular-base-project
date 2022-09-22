import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../pages/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad{


  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) :Observable<boolean> | boolean {

    return this.verificarAcesso();
  }

  private verificarAcesso(){
    if(this._authService.isUsuarioAutenticado()){
      return true;
    }else{
      this._router.navigate(['/login']);
      return false;
    }
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean{
    console.log('Verificando se o usuario pode carregar o modulo...');
    return this.verificarAcesso();
  }
}
