import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/classes/crud-service';
import { environment } from 'src/environments/environment';
import { Contato } from './contatos-lista/contato';

@Injectable({
  providedIn: 'root'
})
export class Contatos2Service extends CrudService<Contato>{

  constructor(protected http:HttpClient) {
      super(http, `${environment.API}contatos`);
   }
}
