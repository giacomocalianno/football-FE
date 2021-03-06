import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private utils: UtilsService) { }

  formLogin;

  setForm() {
    // setto le impostazioni del form
    this.formLogin = new FormGroup({
      email: new FormControl('@gmail.com', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  spinner = false; errore = false;

  sendData() {
    // funzione che manda i dati
    console.log("La mail inserita è: " + this.formLogin.value.email);
    console.log("La password inserita è: " + this.formLogin.value.password);
    
    this.spinner = true;

    // faccio la login mandando i dati inseriti nel form
    this.auth.login(this.formLogin.value.email, this.formLogin.value.password).subscribe((response) => {
      this.spinner = false;
      
      console.log(response);
      this.utils.idTenant = response["id"];
      // salvo tutti i dati nel local storage
      console.log("idtenant salvato nell'utils: " + this.utils.idTenant);
      localStorage.setItem("EmailAdmin", this.formLogin.value.email);
      localStorage.setItem("PasswordAdmin", this.formLogin.value.password);
      localStorage.setItem("IdTenant", response["id"]);
      localStorage.setItem("NomeStruttura", response["name"]);
      localStorage.setItem("Citta", response["city"]);
      localStorage.setItem("Via", response["address"]);
      localStorage.setItem("Cap", response["cap"]);
      // mi sposto alla dashboard dell'admin
      this.router.navigateByUrl("/adminDashboard");
    }, (error) => {
      // gestisco l'errore
      console.log("non esiste nessun admin");
      this.spinner = false;
      console.log(error);
      this.errore = true;
    })
  }

  ngOnInit(): void {
    this.setForm();
  }
}
