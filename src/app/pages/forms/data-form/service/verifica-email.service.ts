import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class VerificaEmailService{
    constructor(private _http: HttpClient){}

    verificaEmail(email: string){
        return this._http.get('assets/verificaEmail.json')
            .pipe(
                delay(2000),
                map(( dados: {emails: any[]} ) => dados.emails),
                // tap(console.log),
                map((dados: {email: string}[]) => dados.filter(v => v.email === email) ),
                // tap(console.log),
                map((dados: any[]) => dados.length > 0),
                // tap(console.log)
            );
    }

}