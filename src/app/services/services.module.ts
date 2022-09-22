import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DropdownService } from './dropdown.service';
import { LogService } from './log.service';
import { SettingsService } from './settings.service';

import { ContatosService } from '../pages/contatos/contatos.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports : [],
  providers : [
    ContatosService,
    DropdownService,
    LogService,
    SettingsService
  ]
})
export class ServicesModule { }
