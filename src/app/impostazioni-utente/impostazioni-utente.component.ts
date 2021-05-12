import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-impostazioni-utente',
  templateUrl: './impostazioni-utente.component.html',
  styleUrls: ['./impostazioni-utente.component.scss']
})
export class ImpostazioniUtenteComponent implements OnInit {

  constructor(private auth: AuthService, private utils: UtilsService) { }

  prova; prova2; dataSourceBackend; 

  caricamento = true;

  
  // TODO ESEMPIO_Dichiarazione_colonne da togliere è prova
  displayedColumns2: string[] = ["seleziona", "name","surname","email","rating","role"];
  dataSourceBackend2;

  name; surname; email; rating; role;
  getImpostazioni(){
    this.name = localStorage.getItem("Nome");
    this.surname = localStorage.getItem("Cognome");
    this.email = localStorage.getItem("EmailUtente");
    this.rating = localStorage.getItem("Rating");
    this.role = localStorage.getItem("Role");
  }

  /*
  fetch() {
    this.auth.().subscribe((response) => {
      console.log("Questa è la risposta intera");
      console.log(response);
      console.log("Questa è la risposta coi dati che ci interessano");
      console.log(response["tenants"]);
      this.prova = response["tenants"];
      this.dataSourceBackend2 = new MatTableDataSource(this.prova);
      this.caricamento = false;
    })
    */

    /* TODO ESEMPIO_Auth.get_risposta da togliere è prova
    this.auth.get2().subscribe((response) => {
      console.log(response["players"]);
      this.prova2 = response["players"];
      this.dataSourceBackend2 = new MatTableDataSource(this.prova2);
      //this.caricamento = false;
      console.log(this.prova);
    });
    */
   ngOnInit(): void {

  }

}

  
