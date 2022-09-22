import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { CursosGuard } from './guards/cursos-guard';
import { ContatosModule } from './pages/contatos/contatos.module';
import { FormsLocalModule } from './pages/forms/forms-local.module';


import { HomeComponent } from './pages/home/home.component';
import { LoginComponent  } from './pages/login/login.component';
import { ReactiveSearchModule } from './pages/reactive-search/reactive-search.module';
import { UploadFileModule } from './pages/upload-file/upload-file.module';
// import { ExerciciosComponent } from './pages/exercicios/exercicios.component';
// import { SwitchPageComponent } from './pages/exercicios/switch-page/switch-page.component';
// import { CursoDetalheComponent } from './pages/exercicios/cursos/curso-detalhe/curso-detalhe.component';
// import { CursoNaoEncontradoComponent } from './pages/exercicios/cursos/curso-nao-encontrado/curso-nao-encontrado.component';

//()=> import('app/pages/exercicios/exercicios.module').then(m => m.ExerciciosModule)
//'app/pages/exercicios/exercicios.module#ExerciciosModule'},
const routes: Routes = [
  { path: 'exercicios', canActivate: [AuthGuardService], canActivateChild: [CursosGuard],canLoad:[AuthGuardService],
   loadChildren: ()=> import('./pages/exercicios/exercicios.module').then(m => m.ExerciciosModule)},
  { path: 'alunos', canActivate: [AuthGuardService],canLoad:[AuthGuardService],
  loadChildren: ()=> import('./pages/alunos/alunos.module').then(m => m.AlunosModule)},
  { path: 'forms', canActivate: [AuthGuardService], canLoad: [AuthGuardService],
    loadChildren: ()=> import('./pages/forms/forms-local.module').then(m => FormsLocalModule)
  },
  {
    path: 'contatos', canActivate:  [AuthGuardService], canLoad: [AuthGuardService],
    loadChildren: ()=> import('./pages/contatos/contatos.module').then(m => ContatosModule)
  },
  {
    path: 'upload', canActivate:  [AuthGuardService], canLoad: [AuthGuardService],
    loadChildren: ()=> import('./pages/upload-file/upload-file.module').then(m => UploadFileModule)
  },
  {
    path: 'busca-reativa', canActivate:  [AuthGuardService], canLoad: [AuthGuardService],
    loadChildren: ()=> import('./pages/reactive-search/reactive-search.module').then(m => ReactiveSearchModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'exercicios', component: ExerciciosComponent},
  // { path: 'exercicios/naoEncontrado', component: CursoNaoEncontradoComponent},
  // { path: 'exercicios/cursos/:id', component: CursoDetalheComponent},
  // { path: 'exercicios/:id', component: SwitchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
