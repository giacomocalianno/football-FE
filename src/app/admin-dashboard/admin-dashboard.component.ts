import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  // parte che si occupa del pop up che visualizza le squadre formate
  closeResult = '';

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // ---- fine

  // dichiarazione variabili usate
  dataSourceSquadra1; dataSourceSquadra2;
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
  displayedColumnsSquadre = ["Nome squadra", "Colore squadra", "Nome", "Cognome", "Rating", "Ruolo"];
  displayedColumns1: string[] = ['idpartita', 'ora', 'data'];
  displayedColumns3: string[] = ['checkbox', 'idpartita', 'ora', 'data'];
  displayedColumnsModificaSquadra: string[] = ['checkbox', 'idgiocatore', 'name', 'surname', "username", "autovalutazione", "ruolo"];
  displayedColumnsGiocatoriPerPartita: string[] = ['checkbox', 'name', 'surname', "autovalutazione", "ruolo"];
  displayedInfo1: string[] = ['idtenant', 'nomestruttura', 'citta'];
  displayedInfo2: string[] = ['via', 'cap', 'email']
  displayedColumnsFeedback: string[] = ["data", "valutazione", "commento"];
  displayedColumnsImpostazioni: string[] = ["Crea partita", "Modifica partita", "Elimina partita"];
  displayedColumnsImpostazioni2: string[] = ["Crea partita", "Modifica partita"];
  displayedColumnsTeams: string[] = ["Checkbox", "Nome", "Colore"];

  constructor(private utils: UtilsService, config: NgbNavConfig, private auth: AuthService, private router:Router, private modalService: NgbModal) {
    config.destroyOnHide = false;
    config.roles = false;
  }

  nomestruttura; email; cap; via; password; citta; idtenant; caricamento = false;

  // prende le informazioni contenute nel local storage e lo assegna a delle variabili
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
    // visualizzo tutte le partite che ho creato
    this.caricamento = true;
    console.log("id tenant: " + localStorage.getItem("IdTenant"));
      this.auth.getMatches(localStorage.getItem("IdTenant")).subscribe((response) => {
      console.log("Elenco di partite del tenant: " + JSON.stringify(response["matches"]));
      this.users = response["matches"];
      this.caricamento = false;
      
      this.dataSourceUpdate = new MatTableDataSource(this.users);
    } )
  }

  setFormDataeOra(){
    // setto come deve essere il form e le sue regole (Validators)
    this.formDataeOra = new FormGroup({
      data : new FormControl("", [Validators.required, Validators.pattern("^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$")]), 
      ora : new FormControl("", [Validators.required, Validators.pattern("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")])
    })
  }

  creata = false; caricamento2 = false; esistePartitaconStessoOrario;
  submit(){
    this.caricamento2 = true;
    const bodyCreateMatch = {
      date : this.formDataeOra.value.data,
      time : this.formDataeOra.value.ora
    }
      console.log("id tenant corrente: " + localStorage.getItem("IdTenant"));
      // funzione che crea il match passandogli i dati inseriti nel form formDataeOra
      this.auth.createMatches(localStorage.getItem("IdTenant"), bodyCreateMatch ).subscribe( () => {
      console.log("Ho creato la partita");
      this.caricamento2 = false;
      this.creata = true;
    });
  }

  modificaSi = false;
  eliminaSi = false;

  visualizzaPrenotazioni(){
    // visualizza le prenotazioni e nasconde il resto
    this.vediPrenotazioni = true;
    this.feedback = false;
    this.impostazioni = false;
    this.tueInfo = false;
    this.getPrenotazioni();
  }

  visualizzaFeedback(){
    // visualizza i feedback e nasconde il resto
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
    // fa il get delle partite
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

    console.log("idTenant: " + localStorage.getItem("IdTenant") + ", id partita scelta: " + this.idCorrente);

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

  idTeamRisposta1; idTeamRisposta2; squadreFormate = false; temp1; temp2; team1; team2;
  formaSquadre(){
    // rimuovo prima i giocatori
    this.auth.removePlayers(localStorage.getItem("IdTenant"), this.idCorrente, null).subscribe( (response) => {
      console.log("removePlayers: " + response);
    });

    // costruisco le squadre
    this.auth.buildTeams(localStorage.getItem("IdTenant"), this.idCorrente).subscribe( (response) => {
      // salvo gli id delle squadre ricevute dal backend
      console.log("build teams" + response);
      this.idTeamRisposta1 = response[0];
      this.idTeamRisposta2 = response[1];

      // faccio la get e visualizzo i giocatori della squadra 1
      this.auth.getTeamPlayers(localStorage.getItem("IdTenant"), this.idCorrente, this.idTeamRisposta1).subscribe( (response) => {
        console.log(JSON.stringify(response));

        // faccio la get della squadra 1 
        this.auth.getTenantTeam(localStorage.getItem("IdTenant"), this.idTeamRisposta1).subscribe((response) => {
          console.log(response);
          this.team1 = response;
        });
        // la inserisco nella tabella
        this.squadreFormate = true;
        this.temp1 = response["players"];
        this.dataSourceSquadra1 = new MatTableDataSource(this.temp1);
      }, (error) => {
        this.squadreFormate = false;
      } );

      // faccio la get e visualizzo i giocatori della squadra 2
      this.auth.getTeamPlayers(localStorage.getItem("IdTenant"), this.idCorrente, this.idTeamRisposta2).subscribe( (response) => {
        console.log(JSON.stringify(response));
        
        this.auth.getTenantTeam(localStorage.getItem("IdTenant"), this.idTeamRisposta2).subscribe((response) => {
          console.log(response);
          
          this.team2 = response;
        });

        this.squadreFormate = true;
        this.temp2 = response["players"];
        this.dataSourceSquadra2 = new MatTableDataSource(this.temp2);
      }, (error) => {
        this.squadreFormate = false;
      });
      
    });
  }

  visualizzaQuesta2(){
    this.vediInnerTabellaImpostazioni = true;
  }

  visualizzaCreaPartita(){
    this.creaSquadra = true;
    this.modificaSquadra = false;
    this.eliminaSquadra = false;
    this.creaPartita = false;
    this.modificaPartita = false;
  }

  divModificaSquadra = false; formModificaTeam;

  caricoModifica = false;
  visualizzaModificaPartita(){
    this.caricoModifica = true;
    this.creaSquadra = false;
    this.modificaSquadra = true;
    this.eliminaSquadra = false;
    this.getDataUpdate();
    this.caricoModifica = false;
    this.creaPartita = false;
    this.modificaPartita = false;
  }

  visualizzaEliminaPartita(){
    this.creaSquadra = false;
    this.modificaSquadra = false;
    this.eliminaSquadra = true;
    this.getDataUpdate();
    this.creaPartita = false;
    this.modificaPartita = false;
  }
 
  creaPartita; modificaPartita; eliminaPartita2; formCreaSquadre;
  visualizzaCreaPartita2(){
    this.creaPartita = true;
    this.modificaPartita = false;
    this.eliminaPartita2 = false;
    this.creaSquadra = false;
    this.modificaSquadra = false;
    this.eliminaSquadra = false;

    this.formCreaSquadre = new FormGroup({
      name : new FormControl("", [Validators.required]),
      color : new FormControl("", [Validators.required])
    });

  }

  teams; dataSourceUpdateTeams;
  visualizzaModificaPartita2(){
    this.creaPartita = false;
    this.modificaPartita = true;
    this.eliminaPartita2 = false;
    this.creaSquadra = false;
    this.modificaSquadra = false;
    this.eliminaSquadra = false;

    this.auth.getTeams(localStorage.getItem("IdTenant")).subscribe( (response) => {
      console.log(response["teams"]);
      console.log("fatto");
      this.teams = response["teams"];
      this.dataSourceUpdateTeams = new MatTableDataSource(this.teams);
    });
    
  }

  dataSourceDeleteTeams;
  visualizzaEliminaPartita2(){
    this.creaPartita = false;
    this.modificaPartita = false;
    this.eliminaPartita2 = true;

    this.auth.getTeams(localStorage.getItem("IdTenant")).subscribe( (response) => {
      console.log(response["teams"]);
      console.log("fatto");
      this.teams = response["teams"];
      this.dataSourceUpdateTeams = new MatTableDataSource(this.teams);
    });
    
  }

  squadraCreata = false;
  submitCreaSquadre(){
    console.log(this.formCreaSquadre.value);
    // funzione che crea squadre
    this.auth.createTeams(localStorage.getItem("IdTenant"), this.formCreaSquadre.value).subscribe( (response) => {
      console.log(JSON.stringify(response));
      console.log("squadre create");
      this.squadraCreata = true;
    })
  }

  getDataUpdate(){
    console.log("id tenant: " + this.utils.idTenant);
      this.auth.getMatches(localStorage.getItem("IdTenant")).subscribe((response) => {
      console.log("Elenco di partite del tenant: " + response["matches"]);
      this.users = response["matches"];
      this.dataSourceUpdate = new MatTableDataSource(this.users);
    });
  }

  idGiocatoreEliminare;
  checked(element){
    // salvo l'id del giocatore da eliminare
    this.checkedCheckbox = true;
    this.utils.idGiocatoreEliminare = element.id;
    console.log("id del giocatore da eliminare è: " + this.utils.idGiocatoreEliminare);
  }

  rimuoviGiocatori(){
    // passo l'id e lo rimuovo
    this.auth.removePlayer(localStorage.getItem("IdTenant"), this.idCorrente, this.utils.idGiocatoreEliminare, null).subscribe ((response) => {
      console.log(JSON.stringify(response));
      location.reload();
    })
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

  setIdSquadraDaModificare(id, name, color){
    // salvo l'id della squadra da modificare
    console.log("La squadra da modificare ha id: " + id);
    this.utils.idPartitaUpdate = id;
    this.divModificaSquadra = true;

    this.formModificaTeam = new FormGroup({
      name : new FormControl(name, [Validators.required]), 
      color : new FormControl(color, [Validators.required])
    })  
  }

  updateTeam(){
    console.log(this.formModificaTeam.value);
    // funzione che modifica il team
    this.auth.updateTeam(localStorage.getItem("IdTenant"), this.utils.idPartitaUpdate, this.formModificaTeam.value).subscribe( (response) => {
      console.log(response);
      location.reload();
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

  listaFeedback; dataSourceFeedback;
  getFeedback(){
    // faccio la get e visualizzo i feedback
    this.auth.getTenantReviews(localStorage.getItem("IdTenant")).subscribe( (response) => {
      console.log(JSON.stringify(response["reviews"]));
      this.listaFeedback = response["reviews"];
      this.dataSourceFeedback = new MatTableDataSource(this.listaFeedback)
    })
  }

  impostaIdPartitaEliminare(idEliminare){
    // salvo id della partita da eliminare
    console.log("ID partita selezionata da eliminare: " + idEliminare);
    this.utils.idPartitaElimina = idEliminare;
  }

  impostaIdSquadraEliminare(idEliminare){
    // salvo id della squadra da eliminare
    console.log("ID partita selezionata da eliminare: " + idEliminare);
    this.utils.idSquadraElimina = idEliminare;
  }

  spinnerElimina = false; eliminaOk;
  eliminaPartita(){
    // chiamo la funzione che elimina la partita selezionata
    this.spinnerElimina = true;
    this.auth.deleteMatch(localStorage.getItem("IdTenant"), this.utils.idPartitaElimina).subscribe( () => {
      console.log("Eliminato");
      this.eliminaOk = true;
      this.getMatches();
      this.spinnerElimina = false;
    } );
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("login");
  }

  ngOnInit(): void {
    this.retrieveLocalStorage();
    this.getPrenotazioni();
    this.setFormDataeOra();
  }

}
