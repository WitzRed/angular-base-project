import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contato } from './contatos-lista/contato';
import { delay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContatosService {

  private readonly API = `${environment.API}contatos`;
  constructor(
    private http:HttpClient
    ) { }

  list() {
    return this.http.get<Contato[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadByID(id){
    return this.http.get<Contato>(`${this.API}/${id}`).pipe(
      take(1)
    );
  }

  private create(contato:any){
    return this.http.post(this.API, contato).pipe(take(1));
  }

  private update(contato:any){
    return this.http.put(`${this.API}/${contato.id}`, contato).pipe(take(1));
  }

  delete(contato:any){
    return this.http.delete(`${this.API}/${contato.id}`).pipe(take(1));
  }

  save(contato:any){
    if(contato.id){
      return this.update(contato)
    }
    return this.create(contato)
  }

  showAlertSuccess(message: string){
    alert(message);
  }

  showAlertDanger(message: string){
    alert(message)
  }

  showConfirm(title:string, message:string, saveTxt?:string, cancelTxt?:string){
   return {
            title: title,
            msg:message,
            saveTxt: saveTxt,
            cancelTxt: cancelTxt
          };
  }

}
