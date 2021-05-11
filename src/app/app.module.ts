import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { Registrazione2Component } from './registrazione2/registrazione2.component';
import { RecapRegistrazioneComponent } from './recap-registrazione/recap-registrazione.component';
import { HomeUtenteComponent } from './home-utente/home-utente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackUtenteComponent } from './feedback-utente/feedback-utente.component';
import { StoricoUtenteComponent } from './storico-utente/storico-utente.component';
import { ImpostazioniUtenteComponent } from './impostazioni-utente/impostazioni-utente.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { PreRegistrazioneComponent } from './pre-registrazione/pre-registrazione.component';
import { RegistrazioneAdminComponent } from './registrazione-admin/registrazione-admin.component';
import { RecapAdminComponent } from './recap-admin/recap-admin.component';
import { ScegliPartitaUserComponent } from './scegli-partita-user/scegli-partita-user.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginUtenteComponent } from './login-utente/login-utente.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrazioneComponent,
    Registrazione2Component,
    RecapRegistrazioneComponent,
    HomeUtenteComponent,
    FeedbackUtenteComponent,
    StoricoUtenteComponent,
    ImpostazioniUtenteComponent,
    AdminDashboardComponent,
    PreRegistrazioneComponent,
    RegistrazioneAdminComponent,
    RecapAdminComponent,
    ScegliPartitaUserComponent,
    LoginUtenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, ReactiveFormsModule, FormsModule, NgbModule, MatTableModule,
    MatFormFieldModule, ReactiveFormsModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatSidenavModule, MatProgressSpinnerModule,
    HttpClientModule, MatTableModule, MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
