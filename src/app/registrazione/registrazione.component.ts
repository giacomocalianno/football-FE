import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  constructor(private router: Router, private utils: UtilsService, private _formBuilder: FormBuilder, private route: Router, private auth: AuthService) { }

  formRegistrazione;

  testoAutovalutaz = "Valuta la tua bravura con un numero da 1 a 5. \nQuesto valore ci servirà per la creazione delle squadre.\nAffinchè le squadre siano equilibrate, sii onesto/a"
  testoRuolo = "Indica il ruolo in cui vorresti giocare. \nTranquillo/a, potrai sempre cambiarlo."

  setForm(){
    //TODO togliere i valori preimpostati
    this.formRegistrazione = new FormGroup({
      nome : new FormControl('Nome', [Validators.required]),
      cognome : new FormControl('Cognome', [Validators.required]),
      email : new FormControl('email@gmail.com', [Validators.required, Validators.email]),
      password : new FormControl('pass', [Validators.required]),
      autovalutazione : new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)]),
      ruolo : new FormControl("", [Validators.required])
    })
  }

  displayedColumns2: string[] = ['checkbox', 'tenantId', 'name', 'city', 'address', 'cap', 'email'];

  dataSourceBackend; prova;
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

  stampaId(id){
    console.log("id: " + id);
    this.utils.idTenant = id;
    localStorage.setItem("IdTenantScelto", id);
    console.log("utils.tentant ora è: " + this.utils.idTenant);
  }


  sendData(){
    console.log("Nome: " + this.formRegistrazione.value.nome);
    console.log("Cognome: " + this.formRegistrazione.value.cognome);
    console.log("Email: " + this.formRegistrazione.value.email);
    console.log("Password: " + this.formRegistrazione.value.password);

    // salvo in questo oggetto i dati da mandare
    const recapDati = {
      name : this.formRegistrazione.value.nome,
      surname: this.formRegistrazione.value.cognome,
      email: this.formRegistrazione.value.email,
      password: this.formRegistrazione.value.password,
      rating: this.formRegistrazione.value.autovalutazione,
      role : this.formRegistrazione.value.ruolo
    }
    // salvo nel local storage i dati
    localStorage.setItem('NomeUtente', recapDati.name);
    localStorage.setItem('CognomeUtente', recapDati.surname);
    localStorage.setItem('EmailUtente', recapDati.email);
    localStorage.setItem('PasswordUtente', recapDati.password);
    localStorage.setItem('Autovalutazione', recapDati.rating);
    localStorage.setItem('Ruolo', recapDati.role);

    this.utils.nome = this.formRegistrazione.value.nome;
    this.utils.cognome = this.formRegistrazione.value.cognome;
    this.utils.email = this.formRegistrazione.value.email;
    this.utils.password = this.formRegistrazione.value.password;
    this.utils.autovalutazione = this.formRegistrazione.value.autovalutazione;
    this.utils.ruolo = this.formRegistrazione.value.ruolo;
    localStorage.setItem('idTenantScelto', this.utils.idTenant);

    // faccio la post
    this.auth.postRequestPlayer(recapDati, this.utils.idTenant).subscribe( (response) => {
      console.log(JSON.stringify(response));
      
      console.log("Post utente fatta");
      this.route.navigateByUrl("/recap")
    }, (error) => {
      alert("Esiste utente con la stessa mail")
      console.log(error);
      console.log("esiste utente con stessa mail");
    });
  }

  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  ngOnInit(): void {
    this.setForm();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.getSocietà();
  }
}
