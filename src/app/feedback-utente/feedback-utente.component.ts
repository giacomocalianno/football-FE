import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-feedback-utente',
  templateUrl: './feedback-utente.component.html',
  styleUrls: ['./feedback-utente.component.scss']
})
export class FeedbackUtenteComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  // colonne da visualizzare nelle tabelle
  displayedColumns = ['checkbox', 'id', 'date', 'time'];
  displayedColumnsGiocatoriPerPartita: string[] = ['checkbox', 'name', 'surname', "autovalutazione", "ruolo"];

  vediInnerTabella;

  prova; dataSourcePartite;
  retrieveMatches(){
    // richiamo tutte le partite
    this.auth.getMatches(localStorage.getItem("idTenantScelto")).subscribe( (response) => {
      console.log("Questa è la risposta intera");
      console.log(response);
      this.prova = response["games"];
      // filtro i giocatori che sono iscritti a quella determinata partita
      let temp = this.prova.filter( (element) => {
        return element.id == localStorage.getItem("IdPartitaIscritto");
      })

      this.dataSourcePartite = new MatTableDataSource(temp);
    } )
  }

  idCorrente; giocatoriPartita; arrayPartitaScelta; emailCorrente;
  
  stampaId(element){
    this.idCorrente = element.id;   
    this.vediInnerTabella = true;

    // faccio la get e visualizzo i giocatori di quella partita
    this.auth.getPlayersMatches(localStorage.getItem("idTenantScelto"), this.idCorrente).subscribe( (response) => {
      console.log(JSON.stringify(response));
      this.giocatoriPartita = response["players"];
      console.log("emailcorrente è:" + this.emailCorrente);
      let temp = this.giocatoriPartita.filter( (player) => {
        // ritorna la partita a cui l'utente è iscritto facendo vedere i giocatori tranne se stesso
        return (player.idpartita == element.idpartita) && (player.email != localStorage.getItem("EmailUtente"));
      })
      
      this.arrayPartitaScelta = new MatTableDataSource(temp);
    })
  }

  formFeedback; formFeedbackStruttura;
  setFormFeedback(){
    // setto le impostazioni del form
    this.formFeedback = new FormGroup({
      valutazione : new FormControl("", [Validators.required, Validators.pattern("[1-5]")])
    })
    this.formFeedbackStruttura = new FormGroup({
      rating : new FormControl("", [Validators.required]),
      comment : new FormControl("", [Validators.required])
    })
  }
  feedbackInviato = false;
  sendFeedbackStruttura(){
    // funzione che invia il feedback alla struttura
    console.log(this.formFeedbackStruttura.value);
    //richiamo la funzione che aggiunge il feedback alla struttura
    this.auth.addFeedbackStruttura(localStorage.getItem("idUtente"), localStorage.getItem("idTenantScelto"), 
    this.formFeedbackStruttura.value).subscribe( (response) => {
      console.log(JSON.stringify(response));
      this.feedbackInviato = true;
    } )
     
  }

  bodyFeedback; feedbackUtenteInviato = false;;
  sendFeedback(){
    console.log(this.formFeedback.value);
    this.bodyFeedback = {
      rating : this.formFeedback.value.valutazione,
      id : this.idGiocatoreFeedback
    };

    console.log("il body che gli sto mandando è " + JSON.stringify(this.bodyFeedback));
    // richiamo la funzione che aggiunge il feedback all'utente
    this.auth.addFeedbackUtente(localStorage.getItem("idTenantScelto"), this.idGiocatoreFeedback, this.idCorrente, this.bodyFeedback).subscribe( () => {
      console.log("Fatto ? ");
      this.feedbackUtenteInviato = true;
      location.reload();
    } );
  }
  
  feedback = false; idGiocatoreFeedback;
  checked(element){ 
    // salvo l'id del giocatore selezionato
    console.log(JSON.stringify(element));
    this.feedback = true;
    this.idGiocatoreFeedback = element.id;
    console.log("idgiocatorefeedback selezionato: " + this.idGiocatoreFeedback);
  }
  
  ngOnInit(): void {
    this.retrieveMatches();
    this.setFormFeedback();
  }
}

