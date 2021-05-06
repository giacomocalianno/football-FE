import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-utente',
  templateUrl: './home-utente.component.html',
  styleUrls: ['./home-utente.component.scss']
})
export class HomeUtenteComponent implements OnInit {

  nome; cognome; email; username; autovalutazione; ruolo

  retrieveLocalStorage(){
    this.nome = localStorage.getItem("Nome");
    this.cognome = localStorage.getItem("Cognome");
    this.email = localStorage.getItem("Email");
    this.username = localStorage.getItem("Username");
    this.autovalutazione = localStorage.getItem("Autovalutazione");
    this.ruolo = localStorage.getItem("Ruolo");
  }

  cambiaAutovalutazione = false;

  // TODO aggiornare valore quando utente seleziona la partita
  partitaSelezionata = false;

  //TODO da togliere, solo prova
  toggleCampo(){
    this.partitaSelezionata = true;
  }
  // --------------------

  cambiaautovalutazione(){
    this.cambiaAutovalutazione = !this.cambiaAutovalutazione;
  }

  closeResult = '';

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  setImpostazioniTrue(){
    this.impostazioni = true;
    this.iscriviti = false;
  }

  setIscrivitiTrue(){
    this.impostazioni = false;
    this.iscriviti = true;
  }

  sceltoPortiere(){
    console.log("Portiere");
    this.popup = true;
  }
  sceltoCentrocampista(){
    console.log("Centrocampista");
    this.popup = true;
  }
  sceltoAttaccante(){
    console.log("Attaccante");
    this.popup = true;
  }
  sceltoDifensore(){
    console.log("Difensore");
    
  }

  ngOnInit(): void {
    this.retrieveLocalStorage();
  }

}
