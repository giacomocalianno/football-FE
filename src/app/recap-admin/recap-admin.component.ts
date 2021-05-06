import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-recap-registrazione',
  templateUrl: './recap-admin.component.html',
  styleUrls: ['./recap-admin.component.scss']
})
export class RecapAdminComponent implements OnInit {

  constructor(private utils: UtilsService) { }

  recapDati;

  usernameSporca = this.utils.nome + "." + this.utils.cognome;
  username = this.usernameSporca.trim().toLowerCase();

  
  concatena(){
    this.recapDati = {
      email : this.utils.emailAdmin,
      password : this.utils.passwordAdmin,
      nomestruttura : this.utils.nomestruttura,
      citta : this.utils.citta,
      via : this.utils.via,
      cap : this.utils.cap
    }
  }

  salvaLocalStorage(){
    localStorage.setItem("Email", this.utils.emailAdmin);
    localStorage.setItem("password", this.utils.passwordAdmin);
    localStorage.setItem("nomestruttura", this.recapDati.nomestruttura);
    localStorage.setItem("citta", this.recapDati.citta);
    localStorage.setItem("via", this.recapDati.via);
    localStorage.setItem("cap", this.recapDati.cap);
  }


  visualizza(){
    console.log(this.recapDati)
  }

  ngOnInit(): void {
    this.concatena();
    this.visualizza();
    this.salvaLocalStorage();
  }

}
