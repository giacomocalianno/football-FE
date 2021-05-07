import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-recap-registrazione',
  templateUrl: './recap-registrazione.component.html',
  styleUrls: ['./recap-registrazione.component.scss']
})
export class RecapRegistrazioneComponent implements OnInit {

  constructor(private utils: UtilsService, private auth: AuthService, private route: Router) { }

  recapDati;

  usernameSporca = this.utils.nome + "." + this.utils.cognome;
  username = this.usernameSporca.trim().toLowerCase();

  salvaLocalStorage(){
    localStorage.setItem('Nome', this.recapDati.nome);
    localStorage.setItem('Cognome', this.recapDati.cognome);
    localStorage.setItem('Username', this.recapDati.username);
    localStorage.setItem('Email', this.recapDati.email);
    localStorage.setItem('Password', this.recapDati.password);
    localStorage.setItem('Autovalutazione', this.recapDati.autovalutazione);
    localStorage.setItem('Ruolo', this.recapDati.ruolo);

    console.log(this.body);
    console.log("Post fatta");
    this.auth.postRequest(this.body);

    this.route.navigateByUrl("/homeUtente");
  }

  body;

  concatena(){
    this.recapDati = {
      nome : this.utils.nome,
      cognome : this.utils.cognome,
      username : this.username,
      email : this.utils.email,
      password : this.utils.password,
      autovalutazione : this.utils.autovalutazione,
      ruolo : this.utils.ruolo,
    }
    this.body = this.recapDati;
  }

  visualizza(){
    console.log(this.recapDati)
  }

  ngOnInit(): void {
    this.concatena();
    this.visualizza();
  }

}
