import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scegli-partita-user',
  templateUrl: './scegli-partita-user.component.html',
  styleUrls: ['./scegli-partita-user.component.scss']
})
export class ScegliPartitaUserComponent implements OnInit {

  constructor(private auth: AuthService, private utils: UtilsService, private route: Router) { }

  displayedColumns: string[] = ['checkbox', 'id', 'ora', 'data', 'numeroGiocatori', 'numPortieri', 'numDifensori', 'numCentrocampisti', 'numAttaccanti'];

  dataSourcePartite; prova;

  formIscrizione; partiteFiltrateOk = [];

  retrieveMatches() {
    /*
    Facendo la get delle partite di quel tenant l'utente visualizza l'elenco delle partite a cui si può iscrivere
    Nota: non può iscriversi se il numero di giocatori è 14.
    Le partite con 14 giocatori non vengono visualizzate, controllo fatto dall'if a riga 35 che filtra l'array
    e restituisce l'array dove il numero di giocatori è minore di 14
    */
    this.auth.getMatches(localStorage.getItem("idTenantScelto")).subscribe((response) => {
      console.log("Questa è la risposta intera");
      console.log(response);
      this.prova = response["matches"];

      this.prova.forEach(element => {
        if (element["numberOfPlayers"] < 14) {
          this.partiteFiltrateOk.push(element);
        }
      });
      this.dataSourcePartite = new MatTableDataSource(this.partiteFiltrateOk);
    })
  }

  idPartitaConfermata; caricamento = false; puoiIscriverti; toccato = false;

  selezionaPartita(element) {
    /*
    L'utente seleziona la partita a cui vuole iscriversi e mi salvo nelle variabili delle informazioni che mi servono per la get
    */
    console.log(JSON.stringify(element));
    this.toccato = true;
    console.log("id: " + element.id);
    this.utils.idPartitaSceltaUtente = element.id;
    this.idPartitaConfermata = element.id;
    console.log("id partita scelta dall'utente ora è: " + this.utils.idPartitaSceltaUtente);

    /* 
    controllo il ruolo dell'utente salvato nel localstorage e lo confronto con il numero di persone col suo stesso
    ruolo nella partita selezionata. Per i portieri il num massimo è 2, difensori centrocampisti e attaccanti 4
    Se il ruolo è esaurito l'utente non può cliccare il bottone relativo all'iscrizione
    */ 

    if (localStorage.getItem("Ruolo") == "Portiere" || localStorage.getItem("Ruolo") == "portiere") {
      if (element["numberOfKeepers"] < 2) {
        console.log("Numero portieri minore di 2, ti puoi iscrivere");
        this.puoiIscriverti = true;
      } else {
        console.log("Numero massimo di portieri raggiunto");
        this.puoiIscriverti = false;
      }
    } else if (localStorage.getItem("Ruolo") == "Difensore" || localStorage.getItem("Ruolo") == "difensore") {
      if (element["numberOfBacks"] < 4) {
        console.log("Numero difensori minore di 4, ti puoi iscrivere");
        this.puoiIscriverti = true;
      } else {
        console.log("Numero massimo di difensori raggiunto");
        this.puoiIscriverti = false;
      }
    } else if (localStorage.getItem("Ruolo") == "Centrocampista" || localStorage.getItem("Ruolo") == "centrocampista") {
      if (element["numberOfMidfielders"] < 4) {
        console.log("Numero centrocampisti minore di 4, ti puoi iscrivere");
        this.puoiIscriverti = true;
      } else {
        console.log("Numero massimo di centrocampisti raggiunto");
        this.puoiIscriverti = false;
      }
    } else if (localStorage.getItem("Ruolo") == "Attaccante" || localStorage.getItem("Ruolo") == "attaccante") {
      if (element["numberOfStrikers"] < 4) {
        console.log("Numero attaccanti minore di 4, ti puoi iscrivere");
        this.puoiIscriverti = true;        
      } else {
        console.log("Numero massimo di attaccanti raggiunto");
        this.puoiIscriverti = false;
      }
    }
  }

  partitaselezionata;
  iscriviUtente() {
    /* 
    Funzione che iscrive l'utente alla partita
    Faccio la post passandogli l'ID del tenant, l'ID dell'utente e l'ID del match e iscrivo l'utente
    */
    console.log("ID partita scelta dall'utente: " + this.idPartitaConfermata);
    this.caricamento = true;
    let idTenant = localStorage.getItem("idTenantScelto");
    let idPlayer = localStorage.getItem("idUtente");
    localStorage.setItem("IdPartitaIscritto", this.idPartitaConfermata)
    this.auth.iscriviPlayer(idTenant, idPlayer, this.idPartitaConfermata, this.idPartitaConfermata).subscribe((response) => {
      console.log("Risposta iscrizione: " + JSON.stringify(response));
      localStorage.setItem("IdPartitaIscritto", this.idPartitaConfermata);
      this.caricamento = false;
      alert("Ti sei iscritto con successo alla partita");
      this.route.navigateByUrl("/homeUtente");
    });

  }

  ngOnInit(): void {
    this.retrieveMatches();
  }

}
