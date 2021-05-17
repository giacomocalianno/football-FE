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
    console.log(JSON.stringify(element));
    this.toccato = true;
    console.log("id: " + element.id);
    this.utils.idPartitaSceltaUtente = element.id;
    this.idPartitaConfermata = element.id;
    console.log("id partita scelta dall'utente ora è: " + this.utils.idPartitaSceltaUtente);

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
    console.log("ID partita scelta dall'utente: " + this.idPartitaConfermata);
    this.caricamento = true;
    let idTenant = localStorage.getItem("idTenantScelto");
    let idPlayer = localStorage.getItem("idUtente");
    localStorage.setItem("IdPartitaIscritto", this.idPartitaConfermata)
    this.auth.iscriviPlayer(idTenant, idPlayer, this.idPartitaConfermata, this.idPartitaConfermata).subscribe((response) => {
      console.log("Risposta iscrizione: " + JSON.stringify(response));
      this.caricamento = false;
      alert("Ti sei iscritto con successo alla partita");
      this.route.navigateByUrl("/homeUtente");
    });

    // TODO salvare in variabile che l'utente ha scelto la partita e sbloccare la posizione
    //@Output this.partitaselezionata = true;

  }

  ngOnInit(): void {
    this.retrieveMatches();
  }

}
