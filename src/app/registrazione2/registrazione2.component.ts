import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-registrazione2',
  templateUrl: './registrazione2.component.html',
  styleUrls: ['./registrazione2.component.scss']
})
export class Registrazione2Component implements OnInit {

  constructor(private route: Router, private utils: UtilsService, private auth: AuthService) { }

  formRegistrazione2;

  testoAutovalutaz = "Valuta la tua bravura con un numero da 1 a 5. \nQuesto valore ci servirà per la creazione delle squadre.\nAffinchè le squadre siano equilibrate, sii onesto/a"
  testoRuolo = "Indica il ruolo in cui vorresti giocare. \nTranquillo/a, potrai sempre cambiarlo."

  setForm(){
    this.formRegistrazione2 = new FormGroup({
      autovalutazione : new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)]),
      ruolo : new FormControl("", [Validators.required]),
      tenant: new FormControl(Validators.required)
    })
  }

  sendData(){
    console.log("Autovalutazione: "+this.formRegistrazione2.value.autovalutazione);
    console.log("Ruolo: "+ this.formRegistrazione2.value.ruolo);
    console.log("Check: "+ this.formRegistrazione2.value.checkbox);

    this.utils.autovalutazione = this.formRegistrazione2.value.autovalutazione;
    this.utils.ruolo = this.formRegistrazione2.value.ruolo;

    this.route.navigate(["/recap"]);
  }

  stampaId(id){
    console.log("id: " + id);
    this.utils.idTenant = id;
    console.log("utils.tentant ora è: " + this.utils.idTenant);
  }

  prova; dataSourceBackend;

  displayedColumns2: string[] = ['checkbox', 'tenantId', 'name', 'city', 'address', 'cap', 'email'];

  getSocietà(){
    this.auth.get().subscribe((response) => {
      console.log("Questa è la risposta intera");
      console.log(response);
      console.log("Questa è la risposta coi dati che ci interessano");
      console.log(response["tenants"]);
      this.prova = response["tenants"];
      this.dataSourceBackend = new MatTableDataSource(this.prova);
    })
  }

  ngOnInit(): void {
    this.setForm();
    this.getSocietà();
  }

}
