import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { UtilsService } from '../utils.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-home-utente',
  templateUrl: './home-utente.component.html',
  styleUrls: ['./home-utente.component.scss']
})
export class HomeUtenteComponent implements OnInit {

  tenants;
  prova;
  dataSourceBackend;
  constructor(private modalService: NgbModal, private auth: AuthService, private utils: UtilsService) { }

  fetch() {
    console.log("Fetch")
    this.auth.get().subscribe((response) => {
      console.log(response);
      this.prova = response;
      this.dataSourceBackend = new MatTableDataSource(this.prova);
      console.log(this.prova);
    });
  }

  recapDati;

  retrieveLocalStorage() {
    this.recapDati = {
      name : this.utils.nome,
      surname : this.utils.cognome,
      email : this.utils.email,
      password : this.utils.password,
      rating : this.utils.autovalutazione,
      role : this.utils.ruolo 
    }
  }

  cambiaAutovalutazione = false;

  // TODO aggiornare valore quando utente seleziona la partita
  partitaSelezionata = false;

  //TODO da togliere, solo prova
  toggleCampo() {
    this.partitaSelezionata = true;
  }
  // --------------------

  cambiaautovalutazione() {
    this.cambiaAutovalutazione = !this.cambiaAutovalutazione;
  }

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
    this.fetch();
  }

}
