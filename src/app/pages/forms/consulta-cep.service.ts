import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  consultaCEP(cep){
    if(cep){
      cep = cep.replace(/\D/g,'');
      console.log(cep)

      if (cep !=""){
        let validacep = /^[0-9]{8}$/;
        
        if(validacep.test(cep)){

          return this._http.get(`https://viacep.com.br/ws/${cep}/json`);
        }
      }
    }
    return of({});
  }

  constructor(private _http: HttpClient) { }
}
