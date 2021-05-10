import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  formLogin;

  setForm(){
    this.formLogin = new FormGroup({
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })
  }

  sendData(){
    console.log("La mail inserita è: " + this.formLogin.value.email);
    console.log("La password inserita è: " + this.formLogin.value.password);

    this.auth.login(this.formLogin.value.email, this.formLogin.value.password).subscribe( (response) => {
      console.log(response);
      this.router.navigateByUrl("/homeUtente");
    })
  }

  ngOnInit(): void {
    this.setForm();
  }
}
