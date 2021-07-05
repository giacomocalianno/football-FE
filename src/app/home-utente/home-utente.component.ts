import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { UtilsService } from '../utils.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-utente',
  templateUrl: './home-utente.component.html',
  styleUrls: ['./home-utente.component.scss']
})
export class HomeUtenteComponent implements OnInit {

  tenants;
  prova;
  dataSourceBackend;
  constructor(private modalService: NgbModal, private auth: AuthService, private utils: UtilsService, private route: Router) { }

  // la funzione logout cancella i dati salvati nel localstorage
  logout(){
    localStorage.clear();
    this.route.navigateByUrl("/login")
  }
  
  name; surname; email; rating; role; recapDati
  
  // prendo tutto ciò che c'è nel localstorage e me lo salvo nelle variabili
  retrieveLocalStorage() {
    this.name = localStorage.getItem("NomeUtente");
    this.surname = localStorage.getItem("CognomeUtente");
    this.email = localStorage.getItem("EmailUtente");
    this.rating = localStorage.getItem("Autovalutazione");
    this.role = localStorage.getItem("Ruolo");
  }

  cambiaAutovalutazione = false;

  partitaSelezionata = false;

  toggleCampo() {
    this.partitaSelezionata = true;
  }

  cambiaautovalutazione() {
    this.cambiaAutovalutazione = !this.cambiaAutovalutazione;
  }

  // settaggi del pop up
  closeResult = '';

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  iscriviti = true;
  impostazioni = false;
  popup = false;

  setImpostazioniTrue() {
    this.impostazioni = true;
    this.iscriviti = false;
  }

  setIscrivitiTrue() {
    this.impostazioni = false;
    this.iscriviti = true;
  }

  sceltoPortiere() {
    console.log("Portiere");
    this.popup = true;
  }
  sceltoCentrocampista() {
    console.log("Centrocampista");
    this.popup = true;
  }
  sceltoAttaccante() {
    console.log("Attaccante");
    this.popup = true;
  }
  sceltoDifensore() {
    console.log("Difensore");

  }

  ngOnInit(): void {
    this.retrieveLocalStorage();
  }

}
