import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormComponent } from './data-form/data-form.component';
import { FormOptionsComponent } from './form-options/form-options.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const formsRoutes: Routes = [
  { path: '', component: FormOptionsComponent,
    children: [
      { path: 'templateForm', component: TemplateFormComponent },
      { path: 'dataForm', component: DataFormComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(formsRoutes)
  ],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
