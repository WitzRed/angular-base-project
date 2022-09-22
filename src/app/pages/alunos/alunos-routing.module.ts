import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AlunosGuard } from "src/app/guards/alunos-guard";
import { AlunosDeactivateGuard } from "src/app/guards/alunos-deactivate-guard";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheResolver } from "./guards/aluno-detalhe.resolver";
import { AuthGuardService } from "src/app/guards/auth-guard.service";


const alunosRoutes: Routes = [
    { path: '', component: AlunosComponent,  canActivateChild: [AlunosGuard],
    children: [
        { path: 'novo', component: AlunoFormComponent },
        { path: ':id', component: AlunoDetalheComponent,
            resolve: { aluno: AlunoDetalheResolver }
        },
        { path: ':id/editar', canDeactivate: [AlunosDeactivateGuard],canLoad:[AuthGuardService],
            component: AlunoFormComponent }
    ] },

];
@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})
export class AlunosRoutingModule{}