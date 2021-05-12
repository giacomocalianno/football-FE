import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scegli-partita-user',
  templateUrl: './scegli-partita-user.component.html',
  styleUrls: ['./scegli-partita-user.component.scss']
})
export class ScegliPartitaUserComponent implements OnInit {

  constructor(private auth: AuthService, private utils: UtilsService, private route: Router) { }

  displayedColumns: string[] = ['checkbox', 'id', 'ora', 'data'];

  dataSourcePartite; prova;

  formIscrizione;

  retrieveMatches(){
    this.auth.getMatches(localStorage.getItem("idTenantScelto")).subscribe( (response) => {
      console.log("Questa è la risposta intera");
      console.log(response);
      this.prova = response["matches"];
      this.dataSourcePartite = new MatTableDataSource(this.prova);
    } )
  }

  idPartitaConfermata;

  stampaId(id){
    console.log("id: " + id);
    this.utils.idPartitaSceltaUtente = id;
    this.idPartitaConfermata = id;
    console.log("id partita scelta dall'utente ora è: " + this.utils.idPartitaSceltaUtente);
  }

  partitaselezionata; 
  iscriviUtente(){
    console.log("ID partita scelta dall'utente: " + this.idPartitaConfermata);

    let idTenant = localStorage.getItem("idTenantScelto");
    let idPlayer = localStorage.getItem("idUtente");
    
    this.auth.iscriviPlayer(idTenant, idPlayer, this.idPartitaConfermata, this.idPartitaConfermata).subscribe( (response) => {
      console.log("Risposta iscrizione: "+ JSON.stringify(response))
      this.route.navigateByUrl("/homeUtente");
    });
    
    // TODO salvare in variabile che l'utente ha scelto la partita e sbloccare la posizione
    //@Output this.partitaselezionata = true;

  }

  ngOnInit(): void {
    this.retrieveMatches();
  }

}
