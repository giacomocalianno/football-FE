import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  arrayPartitaScelta;

  suffix = "users.json";

  showFiller = false;
  users:any;

  dataSource;

  /* 
  dichiarazione delle colonne delle tabelle di visualizzazione
  */

  displayedColumns1: string[] = ['idpartita', 'ora', 'data'];

  displayedColumns3: string[] = ['checkbox', 'idpartita', 'ora', 'data'];

  displayedColumnsModificaSquadra: string[] = ['checkbox', 'idgiocatore', 'name', 'surname', "username", "autovalutazione", "ruolo"];

  displayedColumnsGiocatoriPerPartita: string[] = ['checkbox', 'name', 'surname', "autovalutazione", "ruolo"];

  displayedInfo: string[] = ['idtenant', 'nomestruttura', 'citta', 'via', 'cap', 'email']

  displayedColumnsFeedback: string[] = ["idgiocatore", "valutazione"];

  displayedColumnsImpostazioni: string[] = ["Crea partita", "Modifica partita", "Elimina partita"];

  constructor(private utils: UtilsService, config: NgbNavConfig, private auth: AuthService, private router:Router) {
    config.destroyOnHide = false;
    config.roles = false;
  }

  nomestruttura; email; cap; via; password; citta; idtenant; caricamento = false;

  retrieveLocalStorage(){
    this.idtenant = localStorage.getItem("IdTenant");
    this.nomestruttura = localStorage.getItem("NomeStruttura");
    this.email = localStorage.getItem("EmailAdmin");
    this.password = localStorage.getItem("PasswordAdmin");
    this.cap = localStorage.getItem("Cap");
    this.via = localStorage.getItem("Via");
    this.citta = localStorage.getItem("Citta");
    console.log(this.nomestruttura + " " + this.email + " " + this.cap + " " +this.via + " " + this.citta);
  }

  formDataeOra; dataSourceUpdate;

  getMatches(){
    /*
    visualizzo tutte le partite che ho creato
    */
    this.caricamento = true;
    console.log("id tenant: " + localStorage.getItem("IdTenant"));
      this.auth.getMatches(localStorage.getItem("IdTenant")).subscribe((response) => {
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

    console.log("id tenant corrente: " + localStorage.getItem("IdTenant"));
    /*
    funzione che crea il match passandogli i dati inseriti nel form formDataeOra
    */
    this.auth.createMatches(localStorage.getItem("IdTenant"), bodyCreateMatch ).subscribe( () => {
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
    this.getFeedback();
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
      this.auth.getMatches(localStorage.getItem("IdTenant")).subscribe((response) => {
      console.log("Elenco di partite del tenant: " + response["matches"]);
      this.users = response["matches"];
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  checkedCheckbox = false; giocatoriPartita; numeroGiocatori; 

  numPortieri; numDifensori; numCentrocampisti; numAttaccanti;

  visualizzaQuesta(element){
    /*
    cliccando su una partita, visualizzo una tabella innestata che mi fa vedere tutti i giocatori e i loro dati
    compreso il numero di giocatori per ruolo. Al raggiungimento di 14 giocatori posso formare le squadre
    */
    let countPortieri = 0; let countDifensori = 0; let countCentrocampisti = 0; let countAttaccanti = 0;
    console.log(element)
    this.idCorrente = element.id;
    this.vediInnerTabella = true;

    console.log("idTenant: " + this.utils.idTenant + ", id partita scelta: " + this.idCorrente);

    this.auth.getPlayersMatches(localStorage.getItem("IdTenant"), this.idCorrente).subscribe( (response) => {
      console.log(JSON.stringify(response));
      
      this.giocatoriPartita = response["players"];
      
      // filtro i giocatori cosicchè vedo i giocatori che si sono iscritti a quella partita e non tutti
      
      let temp = this.giocatoriPartita.filter( (player) => {
        return player.idpartita == element.idpartita;
      })
      
      this.numeroGiocatori = temp.length;

      this.arrayPartitaScelta = new MatTableDataSource(temp);

      response["players"].forEach(element => {
        if(element["role"] == "portiere"){
          countPortieri++;
        } else if (element["role"] == "difensore"){
          countDifensori++;
        } else if (element["role"] == "centrocampista"){
          countCentrocampisti++;
        } else if (element["role"] == "attaccante"){
          countAttaccanti++;
        }
      });
      console.log("Portieri: " + countPortieri + "; Difensori: " + countDifensori + "; Centrocamp: " + countCentrocampisti + "; Attacco: " + countAttaccanti);
      this.numPortieri = countPortieri;
      this.numDifensori = countDifensori;
      this.numCentrocampisti = countCentrocampisti;
      this.numAttaccanti = countAttaccanti;
    }, (error) => { 
      console.log(JSON.stringify(error));
    } );
    
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
      this.auth.getMatches(localStorage.getItem("IdTenant")).subscribe((response) => {
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
    
    // funzione che modifica o data o orario o entrambi di una partita
    
    console.log("La partita da modificare ha id: " + id);
    this.utils.idPartitaUpdate = id;

    this.divModifica = true;

    this.formModifica = new FormGroup({
      
      // con queste regex posso inserire solo una data formato gg/mm/aaaa e ora hh:mm
      
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
    
    // faccio l'update con i dati del form inseriti
    this.auth.updateMatch(localStorage.getItem("IdTenant"), this.utils.idPartitaUpdate, this.bodyPartitaModificata).subscribe( (response) => {
      console.log(response);
      console.log("ho fatto la put");
      this.putOk = true;
      this.getMatches();
      this.spinner = false;
    } );
  }

  getFeedback(){
    this.auth.getTenantReviews(localStorage.getItem("IdTenant")).subscribe( (response) => {
      console.log(JSON.stringify(response));
      
    })
  }

  impostaIdPartitaEliminare(idEliminare){
    // salvo id della partita da eliminare
    console.log("ID partita selezionata da eliminare: " + idEliminare);
    this.utils.idPartitaElimina = idEliminare;
  }

  spinnerElimina = false; eliminaOk;
  eliminaPartita(){
    // chiamo la funzione che elimina la partita selezionata
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

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("login")
  }

  ngOnInit(): void {
    this.retrieveLocalStorage();
    this.getPrenotazioni();
    this.setFormDataeOra();
  }

}
