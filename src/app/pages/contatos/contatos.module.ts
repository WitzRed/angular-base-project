import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatosListaComponent } from './contatos-lista/contatos-lista.component';
import { ContatosFormComponent } from './contatos-form/contatos-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ContatosListaComponent,
    ContatosFormComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ContatosModule { }
