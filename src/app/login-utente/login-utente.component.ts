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

  sendData(){
    console.log("La mail inserita è: " + this.formLoginUtente.value.email);
    console.log("La password inserita è: " + this.formLoginUtente.value.password);

    this.auth.login(this.formLoginUtente.value.email, this.formLoginUtente.value.password).subscribe( (response) => {
      console.log(response);
      this.router.navigateByUrl("/homeUtente");
    })
  }

  ngOnInit(): void {
    this.setForm();
  }
}
