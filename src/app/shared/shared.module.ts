import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { BaseFormComponent } from './base-form/base-form.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    ErrorMessageComponent,
    InputFieldComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ErrorMessageComponent,
    InputFieldComponent,
    ConfirmModalComponent
  ],
  entryComponents: [ConfirmModalComponent]
})
export class SharedModule { }
