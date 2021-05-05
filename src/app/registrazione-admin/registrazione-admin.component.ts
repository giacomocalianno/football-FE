import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione-admin.component.html',
  styleUrls: ['./registrazione-admin.component.scss']
})
export class RegistrazioneAdminComponent implements OnInit {

  constructor(private router: Router, private utils: UtilsService, private _formBuilder: FormBuilder) { }

  formRegistrazioneAdmin;

  setForm(){
    this.formRegistrazioneAdmin = new FormGroup({
      nomestruttura : new FormControl('Campo ELIS', [Validators.required]),
      citta : new FormControl('Roma', [Validators.required]),
      via : new FormControl('Via Sandro', [Validators.required]),
      cap : new FormControl('00159', [Validators.required]), 
      email : new FormControl('email@gmail.com', [Validators.required, Validators.email]), 
      password : new FormControl('password', [Validators.required]), 
    })
  }

  sendData(){

    console.log("Nome: " + this.formRegistrazioneAdmin.value.nome);
    console.log("Cognome: " + this.formRegistrazioneAdmin.value.cognome);
    console.log("Email: " + this.formRegistrazioneAdmin.value.email);
    console.log("Password: " + this.formRegistrazioneAdmin.value.password);

    this.utils.emailAdmin = this.formRegistrazioneAdmin.value.email;
    this.utils.passwordAdmin = this.formRegistrazioneAdmin.value.password;
    this.utils.via = this.formRegistrazioneAdmin.value.via;
    this.utils.cap = this.formRegistrazioneAdmin.value.cap;
    this.utils.citta = this.formRegistrazioneAdmin.value.citta;
    this.utils.nomestruttura = this.formRegistrazioneAdmin.value.nomestruttura;
    
    console.log(this.formRegistrazioneAdmin.value);
    
    this.avantiRegistrazione2();
  }

  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  avantiRegistrazione2(){
    this.router.navigate(["/recapAdmin"]);
  }

  ngOnInit(): void {
    this.setForm();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
