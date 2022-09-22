import { Component } from '@angular/core';
import { AuthService } from './pages/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mostrarMenu: boolean = false;

  constructor(private _authService: AuthService){}

  ngOnInit(){
    this._authService.mostrarmenuEmitter.subscribe(
      (auth: boolean) => {
        this.mostrarMenu = auth;
      }
    )
  }
}
