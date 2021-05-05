import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FeedbackUtenteComponent } from './feedback-utente/feedback-utente.component';
import { HomeUtenteComponent } from './home-utente/home-utente.component';
import { ImpostazioniUtenteComponent } from './impostazioni-utente/impostazioni-utente.component';
import { LoginComponent } from './login/login.component';
import { PreRegistrazioneComponent } from './pre-registrazione/pre-registrazione.component';
import { RecapAdminComponent } from './recap-admin/recap-admin.component';
import { RecapRegistrazioneComponent } from './recap-registrazione/recap-registrazione.component';
import { RegistrazioneAdminComponent } from './registrazione-admin/registrazione-admin.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { Registrazione2Component } from './registrazione2/registrazione2.component';
import { StoricoUtenteComponent } from './storico-utente/storico-utente.component';
import { TorneiUtenteComponent } from './tornei-utente/tornei-utente.component';

const routes: Routes = [
  { path: "", component: LoginComponent }, { path: "login", component: LoginComponent }, 
  { path: "registrazione", component: RegistrazioneComponent }, { path: "registrazione2", component: Registrazione2Component },
  { path: "recap", component: RecapRegistrazioneComponent }, { path: "homeUtente", component: HomeUtenteComponent },
  { path: "feedbackUtente", component: FeedbackUtenteComponent }, { path: "storicoUtente", component: StoricoUtenteComponent },
  { path: "torneiUtente", component: TorneiUtenteComponent }, { path: "impostazioniUtente", component: ImpostazioniUtenteComponent },
  { path: "adminDashboard", component: AdminDashboardComponent }, { path: "preRegistrazione", component: PreRegistrazioneComponent }, 
  { path: "registrazioneAdmin", component: RegistrazioneAdminComponent }, { path: "recapAdmin", component: RecapAdminComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
