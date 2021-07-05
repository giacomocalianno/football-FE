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
    // salvo nel localstorage i dati
    localStorage.setItem("recappdatiutente", this.recapDati)
    console.log("Recap dati registrazione utente: " + this.recapDati);
    // ritorno alla login
    this.route.navigateByUrl("/loginUtente");
  }

  body;

  errore = false;
  concatena(){
    // formo l'oggetto da inviare al backend
    this.recapDati = {
      name : this.utils.nome,
      surname : this.utils.cognome,
      email : this.utils.email,
      password : this.utils.password,
      rating : this.utils.autovalutazione,
      role : this.utils.ruolo 
    }
    console.log("recapDati utente è: " + this.recapDati);
  }
  ngOnInit(): void {
    this.concatena();
  }

}
