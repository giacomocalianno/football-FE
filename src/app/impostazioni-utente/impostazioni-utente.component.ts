import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  name; surname; email; rating; role; password;
  getImpostazioni(){
    this.name = localStorage.getItem("NomeUtente");
    this.surname = localStorage.getItem("CognomeUtente");
    this.email = localStorage.getItem("EmailUtente");
    this.rating = localStorage.getItem("Autovalutazione");
    this.role = localStorage.getItem("Ruolo");
    this.password = localStorage.getItem("PasswordUtente");
  }


  abilitamodifica;

  abilitaModifica(){
    this.abilitamodifica = true;
    this.setForm();
  }
  formModifica;
  setForm(){
    this.formModifica = new FormGroup({
      name : new FormControl(this.name, [Validators.required]),
      surname : new FormControl(this.surname, [Validators.required]),
      email : new FormControl(this.email),
      password : new FormControl(this.password, [Validators.required]),
      role : new FormControl(this.role, [Validators.required] )
    })
  }

  submitFormModifica(){
    console.log("Valori modificati: "+JSON.stringify(this.formModifica.value));

    console.log("Sto mandando: " + localStorage.getItem("idTenantScelto") + " " + localStorage.getItem("idUtente") + " " + this.formModifica.value);
    
    this.auth.updatePlayer(localStorage.getItem("idTenantScelto"), localStorage.getItem("idUtente"), this.formModifica.value).subscribe( (response) => {
      console.log("Risposta update player" + response);
      localStorage.setItem("NomeUtente", this.formModifica.value.name);
      localStorage.setItem("CognomeUtente", this.formModifica.value.surname);
      localStorage.setItem("Ruolo", this.formModifica.value.role);
      location.reload();
    } )
  }


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
    this.getImpostazioni();
  }

}

  
