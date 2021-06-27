import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-storico-utente',
  templateUrl: './storico-utente.component.html',
  styleUrls: ['./storico-utente.component.scss']
})
export class StoricoUtenteComponent implements OnInit {

  constructor(private auth: AuthService) { }

  dataSourceStorico;

  displayedColumnsStorico = ['date', 'time'];

  prova;

  getStorico() {
    this.auth.getStorico(localStorage.getItem("idTenantScelto"), localStorage.getItem("idUtente")).subscribe( (response) => {
      console.log(JSON.stringify(response));
      console.log("fatto storico");
      this.prova = response["games"];
      this.dataSourceStorico = new MatTableDataSource(this.prova);
    })  
  }

  ngOnInit(): void {
    this.getStorico();
  }

}
