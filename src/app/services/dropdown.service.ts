import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { IEstado } from '../shared/interfaces/i-estado';
import { ICidade } from '../shared/interfaces/i-cidade';

@Injectable({
  providedIn: 'root'
})
export class DropdownService{

  private requestHeaders: HttpHeaders;

  getEstadosBr():Observable<IEstado[]>{
    return this._http.get<IEstado[]>('assets/estados_br.json')
            .pipe();
  }

  getCidades(idEstado: number){
    return this._http.get<ICidade[]>('assets/cidades.json')
    .pipe(
      map((cidades: ICidade[]) => cidades.filter(c => c.estado == idEstado))
    );
  }

  getTICargos(){
    return [
      {nome: 'Dev',nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev',nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev',nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'Javascript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ];
  }

  
  getNewsletter(){
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ]
}

  getTabloid(id: number): any{
    return this._http.get('https://github.com/gustavoguanabara/html-css/blob/master/aulas-pdf/'+id+' - Modelo de Caixas.pdf',
                          {headers: this.requestHeaders, responseType: 'blob'as 'json'}); 
  }

  constructor(private _http: HttpClient){
    this.requestHeaders = new HttpHeaders();
    // this.requestHeaders = this.requestHeaders.append('Content-Type','application/pdf');
    this.requestHeaders = this.requestHeaders.set('Access-Control-Allow-Origin','*')
                                            .set('Accept', 'application/pdf');
  }


}

