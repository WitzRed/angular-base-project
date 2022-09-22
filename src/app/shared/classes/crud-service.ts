import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs/operators";

export class CrudService<T>{

    constructor(protected http:HttpClient, private API_URL){}

    list() {
        return this.http.get<T[]>(this.API_URL)
          .pipe(
            delay(2000),
            tap(console.log)
          );
      }
    
      loadByID(id){
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(
          take(1)
        );
      }
    
      private create(registry:T){
        return this.http.post(this.API_URL, registry).pipe(take(1));
      }
    
      private update(registry:T){
        return this.http.put(`${this.API_URL}/${registry['id']}`, registry).pipe(take(1));
      }
    
      delete(registry:T){
        return this.http.delete(`${this.API_URL}/${registry['id']}`).pipe(take(1));
      }
    
      save(registry:T){
        if(registry['id']){
          return this.update(registry)
        }
        return this.create(registry)
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