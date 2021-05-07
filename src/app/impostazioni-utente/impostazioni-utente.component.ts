import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-impostazioni-utente',
  templateUrl: './impostazioni-utente.component.html',
  styleUrls: ['./impostazioni-utente.component.scss']
})
export class ImpostazioniUtenteComponent implements OnInit {

  constructor(private auth: AuthService) { }

  prova; dataSourceBackend; 

  caricamento = true;

  displayedColumns: string[] = ['tenantId', 'address', 'cap', 'city', 'email', 'name'];
  
  fetch() {
    console.log("Fetch")
    this.auth.get().subscribe((response) => {
      console.log("Questa è la risposta intera");
      console.log(response);
      console.log("Questa è la risposta coi dati che ci interessano");
      console.log(response["tenants"]);
      this.prova = response["tenants"];
      this.dataSourceBackend = new MatTableDataSource(this.prova);
      this.caricamento = false;
      console.log(this.prova);
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

}
