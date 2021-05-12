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
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })
  }

  spinner = false; errore = false;

  sendData(){
    this.spinner = true;
    console.log("La mail inserita è: " + this.formLoginUtente.value.email);
    console.log("La password inserita è: " + this.formLoginUtente.value.password);

    this.auth.loginPlayer(this.formLoginUtente.value.email, this.formLoginUtente.value.password).subscribe( (response) => {
      this.spinner = false;
      console.log(response);
      localStorage.setItem("idUtente", response["id"]);
      this.router.navigateByUrl("/homeUtente");
    }, (error) => {
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
