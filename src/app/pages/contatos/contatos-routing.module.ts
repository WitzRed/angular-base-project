import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosResolverGuard } from 'src/app/guards/contatos-resolver.guard';
import { ContatosFormComponent } from './contatos-form/contatos-form.component';
import { ContatosListaComponent } from './contatos-lista/contatos-lista.component';

const routes: Routes = [
  {
    path:'', component: ContatosListaComponent
  },
  {
    path: 'novo', component: ContatosFormComponent,
    resolve: {
      contato:ContatosResolverGuard
    }
  },
  {
    path: 'editar/:id', component: ContatosFormComponent,
    resolve: {
      contato:ContatosResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
