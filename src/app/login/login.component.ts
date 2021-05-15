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
    this.formLogin = new FormGroup({
      email: new FormControl('2@gmail.com', [Validators.required]),
      password: new FormControl('2', [Validators.required])
    })
  }

  spinner = false; errore = false;

  sendData() {
    console.log("La mail inserita è: " + this.formLogin.value.email);
    console.log("La password inserita è: " + this.formLogin.value.password);
    
    this.spinner = true;
    this.auth.login(this.formLogin.value.email, this.formLogin.value.password).subscribe((response) => {
      this.spinner = false;
      
      console.log(response);
      this.utils.idTenant = response["id"];
      console.log("idtenant salvato nell'utils: " + this.utils.idTenant);
      localStorage.setItem("EmailAdmin", this.formLogin.value.email);
      localStorage.setItem("PasswordAdmin", this.formLogin.value.password);
      localStorage.setItem("IdTenant", response["id"]);
      this.router.navigateByUrl("/adminDashboard");
    }, (error) => {
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
