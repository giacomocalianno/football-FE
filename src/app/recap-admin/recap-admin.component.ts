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
      email : this.utils.email,
      password : this.utils.password,
      nomestruttura : this.utils.nomestruttura,
      citta : this.utils.citta,
      via : this.utils.via,
      cap : this.utils.cap
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
