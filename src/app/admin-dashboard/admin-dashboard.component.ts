import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  vediPrenotazioni = true;
  feedback = false;
  impostazioni = false;
  tueInfo = false;
  idCorrente: number;

  creaSquadra; modificaSquadra; eliminaSquadra;

  vediInnerTabella = false;
  vediInnerTabellaImpostazioni = false;
  arrayPartitaScelta = [{}];

  suffix = "users.json";

  showFiller = false;
  users:any;

  // TODO da cambiare i valori HARDCODE con query al DATABASE 

  dataSourceimpostazioni = [
    { idpartita : 1, ora : "14:30", data : "27/05/2021"},
    { idpartita : 2, ora : "15:30", data : "27/05/2021"},
    { idpartita : 3, ora : "16:30", data : "28/05/2021"}
  ];

  dataSourceFeedback = [
    { idpartita : 1, ora : "14:30", data : "27/05/2021"},
    { idpartita : 2, ora : "15:30", data : "27/05/2021"},
    { idpartita : 3, ora : "16:30", data : "28/05/2021"}
  ];

  dataSource;

  dataSource2 = [
    { idpartita : 1, idgiocatore : 2, name : "Luca", surname : "Calianno", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 3, idgiocatore : 6, name : "Massimo", surname : "Vtere", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"},
    { idpartita : 3, idgiocatore : 7, name : "Antonio", surname : "Eder", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 1, idgiocatore : 8, name : "Nicola", surname : "Wasteryuio", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 3, idgiocatore : 9, name : "Alessandro", surname : "Xeder", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"}
    ,{ idpartita : 3, idgiocatore : 9, name : "Alessandro", surname : "Xeder", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"}
    ,{ idpartita : 3, idgiocatore : 9, name : "Alessandro", surname : "Xeder", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"}
    ,{ idpartita : 3, idgiocatore : 9, name : "Alessandro", surname : "Xeder", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"}
    ,{ idpartita : 1, idgiocatore : 1, name : "Giacomo", surname : "Calianno", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 1, idgiocatore : 2, name : "Luca", surname : "Calianno", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 2, idgiocatore : 3, name : "Francesco", surname : "Rossini", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"},
    { idpartita : 2, idgiocatore : 4, name : "Sasy", surname : "Kek", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 2, idgiocatore : 5, name : "Heh", surname : "Pop", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 3, idgiocatore : 6, name : "Massimo", surname : "Vtere", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"},
    { idpartita : 3, idgiocatore : 7, name : "Antonio", surname : "Eder", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 1, idgiocatore : 8, name : "Nicola", surname : "Wasteryuio", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 3, idgiocatore : 9, name : "Alessandro", surname : "Xeder", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"}
    ,{ idpartita : 1, idgiocatore : 1, name : "Giacomo", surname : "Calianno", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 1, idgiocatore : 2, name : "Luca", surname : "Calianno", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 2, idgiocatore : 3, name : "Francesco", surname : "Rossini", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"},
    { idpartita : 2, idgiocatore : 4, name : "Sasy", surname : "Kek", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 2, idgiocatore : 5, name : "Heh", surname : "Pop", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 3, idgiocatore : 6, name : "Massimo", surname : "Vtere", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"},
    { idpartita : 1, idgiocatore : 8, name : "Nicola", surname : "Wasteryuio", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 3, idgiocatore : 9, name : "Alessandro", surname : "Xeder", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"}
    ,{ idpartita : 1, idgiocatore : 1, name : "Giacomo", surname : "Calianno", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 1, idgiocatore : 2, name : "Luca", surname : "Calianno", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 2, idgiocatore : 3, name : "Francesco", surname : "Rossini", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"},
    { idpartita : 2, idgiocatore : 4, name : "Sasy", surname : "Kek", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 2, idgiocatore : 5, name : "Heh", surname : "Pop", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 3, idgiocatore : 6, name : "Massimo", surname : "Vtere", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"},
    { idpartita : 3, idgiocatore : 7, name : "Antonio", surname : "Eder", username : "giacomo.calianno", autovalutazione : "4", ruolo : "Difensore"},
    { idpartita : 1, idgiocatore : 8, name : "Nicola", surname : "Wasteryuio", username : "luca.calianno", autovalutazione : "5", ruolo : "Centrocampista"},
    { idpartita : 3, idgiocatore : 9, name : "Alessandro", surname : "Xeder", username : "francesco.rossini", autovalutazione : "1", ruolo : "Attaccante"}
  
  ];

  // -------------- 

  displayedColumns1: string[] = ['idpartita', 'ora', 'data'];

  displayedColumns3: string[] = ['checkbox', 'idpartita', 'ora', 'data'];

  displayedColumnsModificaSquadra: string[] = ['checkbox', 'idgiocatore', 'name', 'surname', "username", "autovalutazione", "ruolo"];

  displayedColumns2: string[] = ['checkbox', 'idgiocatore', 'name', 'surname', "username", "autovalutazione", "ruolo"];

  displayedInfo: string[] = ['idtenant', 'nomestruttura', 'citta', 'via', 'cap', 'email']

  displayedColumnsFeedback: string[] = ["idgiocatore", "valutazione"];

  // TODO da cambiare nome colonne
  displayedColumnsImpostazioni: string[] = ["Crea partita", "Modifica partita", "Elimina partita"];

  constructor(private utils: UtilsService, config: NgbNavConfig, private auth: AuthService ) {
    config.destroyOnHide = false;
    config.roles = false;
  }

  nomestruttura; email; cap; via; citta; idtenant; caricamento = false;

  retrieveLocalStorage(){
    this.idtenant = this.utils.idTenant;
    this.nomestruttura = localStorage.getItem("name");
    this.email = localStorage.getItem("Email");
    this.cap = localStorage.getItem("cap");
    this.via = localStorage.getItem("via");
    this.citta = localStorage.getItem("citta");
    console.log(this.nomestruttura + " " + this.email + " " + this.cap + " " +this.via + " " + this.citta);
  }

  formDataeOra; dataSourceUpdate;

  getMatches(){
    this.caricamento = true;
    console.log("id tenant: " + this.utils.idTenant);
      this.auth.getMatches(this.utils.idTenant).subscribe((response) => {
      console.log("Elenco di partite del tenant: " + response["matches"]);
      this.users = response["matches"];
      this.caricamento = false;
      this.dataSourceUpdate = new MatTableDataSource(this.users);
    } )
  }

  setFormDataeOra(){
    this.formDataeOra = new FormGroup({
      data : new FormControl("", [Validators.required, Validators.pattern("^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$")]), 
      ora : new FormControl("", [Validators.required, Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")])
    })
  }

  creata = false; caricamento2 = false;
  submit(){
    this.caricamento2 = true;
    const bodyCreateMatch = {
      date : this.formDataeOra.value.data,
      time : this.formDataeOra.value.ora
    }

    console.log("id tenant corrente: " + this.utils.idTenant);
    
    this.auth.createMatches(this.utils.idTenant, bodyCreateMatch ).subscribe( () => {
      console.log("Ho creato la partita");
      this.caricamento2 = false;
      this.creata = true;
    })
  }

  modificaSi = false;
  eliminaSi = false;

  visualizzaPrenotazioni(){
    this.vediPrenotazioni = true;
    this.feedback = false;
    this.impostazioni = false;
    this.tueInfo = false;
    this.getPrenotazioni();
  }
  

  visualizzaFeedback(){
    this.vediPrenotazioni = false;
    this.feedback = true;
    this.impostazioni = false;
    this.tueInfo = false;
  }

  visualizza3(){
    this.vediPrenotazioni = false;
    this.feedback = false;
    this.impostazioni = true;    
    this.tueInfo = false;
  }

  visualizzaTueInfo(){
    this.vediPrenotazioni = false;
    this.feedback = false;
    this.impostazioni = false;
    this.tueInfo = true;
  }

  getPrenotazioni(){
      console.log("id tenant: " + this.utils.idTenant);
      this.auth.getMatches(this.utils.idTenant).subscribe((response) => {
      console.log("Elenco di partite del tenant: " + response["matches"]);
      this.users = response["matches"];
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  checkedCheckbox = false;

  visualizzaQuesta(element){
    console.log(element)
    this.idCorrente = element.id;
    let temp = this.dataSource2.filter( (player) => {
      return player.idpartita == element.idpartita;
    })    
    this.arrayPartitaScelta = temp;
    this.vediInnerTabella = true;
  }

  visualizzaQuesta2(){
    this.vediInnerTabellaImpostazioni = true;
  }

  visualizzaCreaPartita(){
    this.creaSquadra = true;
    this.modificaSquadra = false;
    this.eliminaSquadra = false;
  }

  caricoModifica = false;
  visualizzaModificaPartita(){
    this.caricoModifica = true;
    this.creaSquadra = false;
    this.modificaSquadra = true;
    this.eliminaSquadra = false;
    this.getDataUpdate();
    this.caricoModifica = false;
  }

  getDataUpdate(){
    console.log("id tenant: " + this.utils.idTenant);
      this.auth.getMatches(this.utils.idTenant).subscribe((response) => {
      console.log("Elenco di partite del tenant: " + response["matches"]);
      this.users = response["matches"];
      this.dataSourceUpdate = new MatTableDataSource(this.users);
    });
  }

  checked(){
    this.checkedCheckbox = true;
  }

  rimuoviGiocatori(){
    //TODO funzione che rimuove giocatore/i selezionato/i

  }

  divModifica = false;
  formModifica;

  setIdPartitaDaModificare(id, time, date){
    console.log("La partita da modificare ha id: " + id);
    this.utils.idPartitaUpdate = id;

    this.divModifica = true;

    this.formModifica = new FormGroup({
      date : new FormControl(date, [Validators.required, Validators.pattern("^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$")]), 
      time : new FormControl(time, [Validators.required, Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")])
    })  
  }

  bodyPartitaModificata; putOk; spinner = false;
  updatePartita(){
    console.log(this.formModifica.value.date + " " + this.formModifica.value.time);
    
    this.bodyPartitaModificata = {
      date : this.formModifica.value.date,
      time : this.formModifica.value.time 
    }

    console.log("body partita aggiornata: "+ JSON.stringify(this.bodyPartitaModificata));

    this.spinner = true;
  
    this.auth.updateMatch(this.utils.idTenant, this.utils.idPartitaUpdate, this.bodyPartitaModificata).subscribe( (response) => {
      console.log(response);
      console.log("ho fatto la put");
      this.putOk = true;
      this.getMatches();
      this.spinner = false;
    } );
  }

  impostaIdPartitaEliminare(idEliminare){
    console.log("ID partita selezionata da eliminare: " + idEliminare);
    this.utils.idPartitaElimina = idEliminare;
  }

  spinnerElimina = false; eliminaOk;
  eliminaPartita(){
    this.spinnerElimina = true;
    this.auth.deleteMatch(this.utils.idTenant, this.utils.idPartitaElimina).subscribe( () => {
      console.log("Eliminato");
      this.eliminaOk = true;
      this.getMatches();
      this.spinnerElimina = false;
    } );
  }

  

  visualizzaEliminaPartita(){
    this.creaSquadra = false;
    this.modificaSquadra = false;
    this.eliminaSquadra = true;
    this.getDataUpdate();
  }

  ngOnInit(): void {
    this.getPrenotazioni();
    this.retrieveLocalStorage();
    this.setFormDataeOra();
  }

}
