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
    
    localStorage.setItem('Name', this.recapDati.name);
    localStorage.setItem('Surname', this.recapDati.surname);
    localStorage.setItem('Username', this.recapDati.username);
    localStorage.setItem('EmailUtente', this.recapDati.email);
    localStorage.setItem('PasswordUtente', this.recapDati.password);
    localStorage.setItem('Rating', this.recapDati.rating);
    localStorage.setItem('Role', this.recapDati.role);
  

    localStorage.setItem("recappdatiutente", this.recapDati)
    console.log("Recap dati registrazione utente: " + this.recapDati);
    
    this.route.navigateByUrl("/homeUtente");
  }

  body;

  concatena(){
    this.recapDati = {
      name : this.utils.nome,
      surname : this.utils.cognome,
      email : this.utils.email,
      password : this.utils.password,
      rating : this.utils.autovalutazione,
      role : this.utils.ruolo 
    }
    console.log("recapDati utente è: " + this.recapDati);

    this.auth.postRequestPlayer(this.recapDati, this.utils.idTenant).subscribe( () => {
      console.log("Post utente fatta");
    });
    
  }
  ngOnInit(): void {
    this.concatena();
  }

}
