import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

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
  }

  ngOnInit(): void {
    this.setForm();
  }


}
