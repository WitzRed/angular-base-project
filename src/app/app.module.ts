import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import '@angular/common/locales/global/pt';

import { AppRoutingModule } from './app-routing.module';
// import { ExerciciosModule } from './pages/exercicios/exercicios.module';
// import { AlunosModule } from './pages/alunos/alunos.module';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

import { SettingsService  } from './services/settings.service';
import { AuthService } from './pages/login/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { CursosGuard } from './guards/cursos-guard';
import { AlunosGuard } from './guards/alunos-guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
// import { InputFieldComponent } from './services/input-field/input-field.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ExerciciosModule,
    // AlunosModule,
    ServicesModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    CursosGuard,
    AlunosGuard,
    {
      provide: LOCALE_ID,
      // useValue: 'pt'
      deps: [SettingsService],
      useFactory: (settingService: { getLocale: () => any; }) => settingService.getLocale()
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
