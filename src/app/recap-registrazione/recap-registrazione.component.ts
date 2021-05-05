import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-recap-registrazione',
  templateUrl: './recap-registrazione.component.html',
  styleUrls: ['./recap-registrazione.component.scss']
})
export class RecapRegistrazioneComponent implements OnInit {

  constructor(private utils: UtilsService) { }

  recapDati;

  usernameSporca = this.utils.nome + "." + this.utils.cognome;
  username = this.usernameSporca.trim().toLowerCase();

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
  }

  visualizza(){
    console.log(this.recapDati)
  }

  ngOnInit(): void {
    this.concatena();
    this.visualizza();
  }

}
