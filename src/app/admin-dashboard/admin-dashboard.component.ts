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

  displayedColumnsModificaSquadra: string[] = ['checkbox', 'idgiocatore', 'name', 'surname', "username", "autovalutazione", "ruolo"];

  displayedColumns2: string[] = ['checkbox', 'idgiocatore', 'name', 'surname', "username", "autovalutazione", "ruolo"];

  displayedInfo: string[] = ['idtenant', 'nomestruttura', 'citta', 'via', 'cap', 'email']

  displayedColumnsFeedback: string[] = ["idgiocatore", "valutazione"];

  // TODO da cambiare nome colonne
  displayedColumnsImpostazioni: string[] = ["Crea squadra", "Modifica squadra", "Elimina squadra"];

  constructor(private utils: UtilsService, config: NgbNavConfig, private auth: AuthService ) {
    config.destroyOnHide = false;
    config.roles = false;
  }

  nomestruttura; email; cap; via; citta; idtenant;

  retrieveLocalStorage(){
    this.idtenant = this.utils.idTenant;
    this.nomestruttura = localStorage.getItem("name");
    this.email = localStorage.getItem("Email");
    this.cap = localStorage.getItem("cap");
    this.via = localStorage.getItem("via");
    this.citta = localStorage.getItem("citta");
    console.log(this.nomestruttura + " " + this.email + " " + this.cap + " " +this.via + " " + this.citta);
  }

  formDataeOra;

  setFormDataeOra(){
    this.formDataeOra = new FormGroup({
      data : new FormControl("", [Validators.required, Validators.pattern("^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$")]), 
      ora : new FormControl("", [Validators.required, Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")])
    })
  }

  creata = false;

  submit(){
    const bodyCreateMatch = {
      date : this.formDataeOra.value.data,
      time : this.formDataeOra.value.ora
    }

    console.log("id tenant corrente: " + this.utils.idTenant);
    
    this.auth.createMatches(this.utils.idTenant, bodyCreateMatch ).subscribe( () => {
      console.log("Ho creato la partita");
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

  getData(){
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
    this.idCorrente = element.idpartita;
    let temp = this.dataSource2.filter( (player) => {
      return player.idpartita == element.idpartita;
    })    
    this.arrayPartitaScelta = temp;
    this.vediInnerTabella = true;
  }

  visualizzaQuesta2(){
    this.vediInnerTabellaImpostazioni = true;
  }

  visualizzaCreaSquadra(){
    this.creaSquadra = true;
    this.modificaSquadra = false;
    this.eliminaSquadra = false;
  }

  visualizzaModificaSquadra(){
    this.creaSquadra = false;
    this.modificaSquadra = true;
    this.eliminaSquadra = false;
  }

  visualizzaEliminaSquadra(){
    this.creaSquadra = false;
    this.modificaSquadra = false;
    this.eliminaSquadra = true;
  }

  checked(){
    this.checkedCheckbox = true;
  }

  formaSquadre(){
    // TODO funzione CREA SQUADRA

  }

  rimuoviGiocatori(){
    //TODO funzione che rimuove giocatore/i selezionato/i

  }

  ngOnInit(): void {
    this.getData();
    this.retrieveLocalStorage();
    this.setFormDataeOra();
  }

}
