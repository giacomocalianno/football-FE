import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-storico-utente',
  templateUrl: './storico-utente.component.html',
  styleUrls: ['./storico-utente.component.scss']
})
export class StoricoUtenteComponent implements OnInit {

  constructor(private modalService: NgModule, private auth: AuthService) { }


  dataSourceStorico;

  displayedColumnsStorico = ['date', 'time']

  ngOnInit(): void {

  }

}
