import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione-admin.component.html',
  styleUrls: ['./registrazione-admin.component.scss']
})
export class RegistrazioneAdminComponent implements OnInit {

  constructor(private router: Router, private utils: UtilsService, private _formBuilder: FormBuilder, private auth: AuthService) { }

  formRegistrazioneAdmin;

  setForm(){
    //TODO togliere i valori preimpostati
    this.formRegistrazioneAdmin = new FormGroup({
      nomestruttura : new FormControl('NomeStruttura', [Validators.required]),
      citta : new FormControl('Città', [Validators.required]),
      via : new FormControl('Via', [Validators.required]),
      cap : new FormControl(123, [Validators.required, Validators.minLength(4), Validators.maxLength(5)]), 
      email : new FormControl('email_struttura@gmail.com', [Validators.required, Validators.email]), 
      password : new FormControl('passStruttura', [Validators.required]), 
    })
  }

  sendData(){

    console.log("Nome: " + this.formRegistrazioneAdmin.value.nomestruttura);
    console.log("Città: " + this.formRegistrazioneAdmin.value.citta);
    console.log("Email: " + this.formRegistrazioneAdmin.value.email);
    console.log("Password: " + this.formRegistrazioneAdmin.value.password);
    console.log("type of CAP: " + typeof(this.formRegistrazioneAdmin.value.cap));
    console.log("via: " + this.formRegistrazioneAdmin.value.via);

    this.utils.emailAdmin = this.formRegistrazioneAdmin.value.email;
    this.utils.passwordAdmin = this.formRegistrazioneAdmin.value.password;
    this.utils.via = this.formRegistrazioneAdmin.value.via;
    this.utils.cap = this.formRegistrazioneAdmin.value.cap;
    this.utils.citta = this.formRegistrazioneAdmin.value.citta;
    this.utils.nomestruttura = this.formRegistrazioneAdmin.value.nomestruttura;
    
    console.log(this.formRegistrazioneAdmin.value);

    const recapDati = {
      email: this.formRegistrazioneAdmin.value.email,
      password: this.formRegistrazioneAdmin.value.password,
      name: this.formRegistrazioneAdmin.value.nomestruttura,
      cap: this.formRegistrazioneAdmin.value.cap,
      address: this.formRegistrazioneAdmin.value.via,
      city: this.formRegistrazioneAdmin.value.citta
    }

    console.log(recapDati);

    this.auth.postRequest(recapDati).subscribe( (response) => {
      console.log("Post admin fatta: " + JSON.stringify(response));
      this.router.navigateByUrl("/recapAdmin");
    }, (error) => {
      console.log(error);
      console.log("esiste admin con stessa mail");
      alert("Esiste admin con stessa mail")
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
  }
}
