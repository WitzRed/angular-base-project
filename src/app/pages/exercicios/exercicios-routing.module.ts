import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciciosComponent } from './exercicios.component';
import { InputPropertyComponent } from './input-property/input-property.component';

import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { MeuSegundoComponent } from './meu-segundo/meu-segundo.component';
import { OutputPropertyComponent } from './output-property/output-property.component';
import { SwitchPageComponent } from './switch-page/switch-page.component';


const exerciciosRoutes: Routes = [
    { path: '', component: ExerciciosComponent},
    { path: 'meu-primeiro', component: MeuPrimeiroComponent },
    { path: 'meu-segundo', component: MeuSegundoComponent },
    { path: 'input-property', component: InputPropertyComponent },
    { path: 'output-property', component: OutputPropertyComponent},
    { path: ':id', component: SwitchPageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(exerciciosRoutes)],
    exports: [RouterModule]
})
export class ExerciciosRoutingModule{}