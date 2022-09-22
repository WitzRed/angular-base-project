import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutencticado: boolean = false;
  private adminUser: boolean = false;

  mostrarmenuEmitter = new EventEmitter<boolean>();

  fazerLogin(usuario: Usuario) {
    if (usuario.name === 'usuario@email.com'
      && usuario.password === '123456') {
      this.usuarioAutencticado = true;
      this.adminUser = false;

      if (this.usuarioAutencticado == true) {
        this.mostrarmenuEmitter.emit(true);
        this._router.navigate(['/']);
      }
    } else {
      if (usuario.name === 'admin@email.com'
        && usuario.password === '123456') {
        this.usuarioAutencticado = true;
        this.adminUser = true;

        if (this.usuarioAutencticado == true) {
          this.mostrarmenuEmitter.emit(true);
          this._router.navigate(['/']);
        }
      }
      else {
        this.usuarioAutencticado = false;
        this.mostrarmenuEmitter.emit(false);
      }
    }
  }
  isUsuarioAutenticado() {
    return this.usuarioAutencticado;
  }
  isAdminUser() {
    return this.adminUser;
  }
  constructor(private _router: Router) { }
}
