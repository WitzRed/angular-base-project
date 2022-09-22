import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FormOptionsComponent } from './form-options/form-options.component';
import { FormsRoutingModule } from './forms-routing.module';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { ConsultaCepService } from './consulta-cep.service';
import { VerificaEmailService } from './data-form/service/verifica-email.service';
import { ServicesModule } from 'src/app/services/services.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { DropdownService } from 'src/app/services/dropdown.service';
// import { ErrorMessageComponent } from 'src/app/services/error-message/error-message.component';
// import { InputFieldComponent } from 'src/app/services/input-field/input-field.component';


@NgModule({
  declarations: [
    FormOptionsComponent,
    TemplateFormComponent,
    DataFormComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServicesModule,
    SharedModule,
    FormsRoutingModule
  ],
  // exports: [
  //   ErrorMessageComponent,
  //   InputFieldComponent
  // ],
  providers:[
    // DropdownService,
    ConsultaCepService,
    VerificaEmailService
  ]
})
export class FormsLocalModule { }
