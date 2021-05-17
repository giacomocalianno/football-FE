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

  displayedColumns = ['checkbox', 'id', 'date', 'time'];
  displayedColumnsGiocatoriPerPartita: string[] = ['checkbox', 'name', 'surname', "autovalutazione", "ruolo", "email"];

  vediInnerTabella;

  prova; dataSourcePartite;
  retrieveMatches(){
    this.auth.getMatches(localStorage.getItem("idTenantScelto")).subscribe( (response) => {
      console.log("Questa è la risposta intera");
      console.log(response);
      this.prova = response["matches"];

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

    //console.log("idTenant: " + this.utils.idTenant + ", id partita scelta: " + this.idCorrente);
    
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
    this.formFeedback = new FormGroup({
      valutazione : new FormControl("", [Validators.required, Validators.pattern("[1-5]")])
    })
    this.formFeedbackStruttura = new FormGroup({
      rating : new FormControl("", [Validators.required]),
      comment : new FormControl("", [Validators.required])
    })
  }

  sendFeedbackStruttura(){
    console.log(this.formFeedbackStruttura.value);

    this.auth.addFeedbackStruttura(localStorage.getItem("idUtente"), localStorage.getItem("idTenantScelto"), 
    this.formFeedbackStruttura.value).subscribe( (response) => {
      console.log(JSON.stringify(response));
      
    } )
     
  }

  bodyFeedback; feedbackInviato;
  sendFeedback(){
    console.log(this.formFeedback.value);
    this.bodyFeedback = {
      rating : this.formFeedback.value.valutazione,
      id : this.idGiocatoreFeedback
    }

    console.log("il body che gli sto mandando è " + JSON.stringify(this.bodyFeedback));
    this.auth.addFeedbackUtente(localStorage.getItem("idTenantScelto"), this.idGiocatoreFeedback, this.idCorrente, this.bodyFeedback).subscribe( () => {
      console.log("Fatto ? ");
      this.feedbackInviato = true;
      location.reload();
    } )

  }
 
  
  feedback = false; idGiocatoreFeedback;
  checked(element){
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

