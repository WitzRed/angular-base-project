import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Contato } from '../pages/contatos/contatos-lista/contato';
import { ContatosService } from '../pages/contatos/contatos.service';

@Injectable({
  providedIn: 'root'
})
export class ContatosResolverGuard implements Resolve<Contato> {

  constructor(private contatoService: ContatosService ){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Contato | Observable<Contato> | Promise<Contato> {
    
    if(route.params && route.params['id']){
      return this.contatoService.loadByID(route.params['id']);
    }

    return of({
      id: null,
      nome: null
    });
  }

  
}
