import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-registrazione2',
  templateUrl: './registrazione2.component.html',
  styleUrls: ['./registrazione2.component.scss']
})
export class Registrazione2Component implements OnInit {

  constructor(private route: Router, private utils: UtilsService) { }

  formRegistrazione2;

  testoAutovalutaz = "Valuta la tua bravura con un numero da 1 a 5. \nQuesto valore ci servirà per la creazione delle squadre.\nAffinchè le squadre siano equilibrate, sii onesto/a"
  testoRuolo = "Indica il ruolo in cui vorresti giocare. \nTranquillo/a, potrai sempre cambiarlo."

  setForm(){
    this.formRegistrazione2 = new FormGroup({
      autovalutazione : new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)]),
      ruolo : new FormControl("", [Validators.required])
    })
  }

  sendData(){
    console.log("Autovalutazione: "+this.formRegistrazione2.value.autovalutazione);
    console.log("Ruolo: "+this.formRegistrazione2.value.ruolo);

    this.utils.autovalutazione = this.formRegistrazione2.value.autovalutazione;
    this.utils.ruolo = this.formRegistrazione2.value.ruolo;

    this.recapRegistrazione();
  }

  recapRegistrazione(){
    this.route.navigate(["/recap"]);
  }


  ngOnInit(): void {
    this.setForm();
  }

}
