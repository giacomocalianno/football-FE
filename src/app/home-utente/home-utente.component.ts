import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-utente',
  templateUrl: './home-utente.component.html',
  styleUrls: ['./home-utente.component.scss']
})
export class HomeUtenteComponent implements OnInit {

  cambiaAutovalutazione = false;

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
  tornei = false;
  impostazioni = false;
  popup = false;

  setTorneiTrue(){
    this.tornei = true;
    this.impostazioni = false;
    this.iscriviti = false;
  }

  setImpostazioniTrue(){
    this.tornei = false;
    this.impostazioni = true;
    this.iscriviti = false;
  }

  setIscrivitiTrue(){
    this.tornei = false;
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
  }

}
