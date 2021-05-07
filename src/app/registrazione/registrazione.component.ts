import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  constructor(private router: Router, private utils: UtilsService, private _formBuilder: FormBuilder) { }

  formRegistrazione;

  setForm(){
    //TODO togliere i valori preimpostati
    this.formRegistrazione = new FormGroup({
      nome : new FormControl('Giacomo', [Validators.required]),
      cognome : new FormControl('Calianno', [Validators.required]),
      email : new FormControl('ciao@gmail.com', [Validators.required, Validators.email]),
      password : new FormControl('ciao', [Validators.required])
    })
  }

  sendData(){
    console.log("Nome: " + this.formRegistrazione.value.nome);
    console.log("Cognome: " + this.formRegistrazione.value.cognome);
    console.log("Email: " + this.formRegistrazione.value.email);
    console.log("Password: " + this.formRegistrazione.value.password);

    this.utils.nome = this.formRegistrazione.value.nome;
    this.utils.cognome = this.formRegistrazione.value.cognome;
    this.utils.email = this.formRegistrazione.value.email;
    this.utils.password = this.formRegistrazione.value.password;

    this.avantiRegistrazione2();
  }

  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  avantiRegistrazione2(){
    this.router.navigate(["/registrazione2"]);
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
