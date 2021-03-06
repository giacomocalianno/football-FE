import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-utente.component.html',
  styleUrls: ['./login-utente.component.scss']
})
export class LoginUtenteComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private utils: UtilsService) { }

  formLoginUtente;

  setForm(){
    this.formLoginUtente = new FormGroup({
      email : new FormControl('@gmail.com', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })
  }

  spinner = false; errore = false;

  sendData(){
    this.spinner = true;
    console.log("La mail inserita è: " + this.formLoginUtente.value.email);
    console.log("La password inserita è: " + this.formLoginUtente.value.password);
    // faccio la login coi dati inseriti nel form
    this.auth.loginPlayer(this.formLoginUtente.value.email, this.formLoginUtente.value.password).subscribe( (response) => {
      this.spinner = false;
      console.log(response);
      localStorage.setItem("idUtente", response["id"]);
      localStorage.setItem("NomeUtente", response["name"]);
      localStorage.setItem("CognomeUtente", response["surname"]);
      localStorage.setItem("EmailUtente", response["email"]);
      localStorage.setItem("Autovalutazione", response["rating"]);
      localStorage.setItem("Ruolo", response["role"]);
      localStorage.setItem("idTenantScelto", response["tenant"]);
      this.router.navigateByUrl("/homeUtente");
    }, (error) => {
      // gestisco l'errore
      this.spinner = false;
      console.log("non esiste nessun utente");
      console.log(error);
      this.errore = true;
    } )
  }

  ngOnInit(): void {
    this.setForm();
  }
}
