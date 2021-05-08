import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-recap-registrazione',
  templateUrl: './recap-admin.component.html',
  styleUrls: ['./recap-admin.component.scss']
})
export class RecapAdminComponent implements OnInit {

  constructor(private utils: UtilsService, private auth: AuthService, private route: Router) { }

  recapDati;

  usernameSporca = this.utils.nome + "." + this.utils.cognome;
  username = this.usernameSporca.trim().toLowerCase();

  bodyAdmin;

  concatena(){
    this.recapDati = {
      email : this.utils.emailAdmin,
      password : this.utils.passwordAdmin,
      name : this.utils.nomestruttura,
      city : this.utils.citta,
      address : this.utils.via,
      cap : this.utils.cap
    }    
  }

  salvaLocalStorage(){
    localStorage.setItem("Email", this.utils.emailAdmin);
    localStorage.setItem("password", this.utils.passwordAdmin);
    localStorage.setItem("name", this.recapDati.name);
    localStorage.setItem("citta", this.recapDati.city);
    localStorage.setItem("via", this.recapDati.address);
    localStorage.setItem("cap", this.recapDati.cap);

    console.log(this.recapDati);
    console.log(this.recapDati["email"]);
    this.auth.postRequest(this.recapDati).subscribe( () => {
      console.log("Post admin fatta");
    });

    this.route.navigateByUrl("/adminDashboard");
  }

  visualizza(){
    console.log(this.recapDati)
  }

  ngOnInit(): void {
    this.concatena();
    this.visualizza();
  }

}
