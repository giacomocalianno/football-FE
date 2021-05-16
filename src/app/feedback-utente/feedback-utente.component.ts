import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-feedback-utente',
  templateUrl: './feedback-utente.component.html',
  styleUrls: ['./feedback-utente.component.scss']
})
export class FeedbackUtenteComponent implements OnInit {

  constructor(private auth: AuthService) { }

  displayedColumns = ['checkbox', 'id', 'date', 'time'];
  displayedColumnsGiocatoriPerPartita: string[] = ['checkbox', 'name', 'surname', "autovalutazione", "ruolo"];

  vediInnerTabella;

  prova; dataSourcePartite;
  retrieveMatches(){
    this.auth.getMatches(localStorage.getItem("idTenantScelto")).subscribe( (response) => {
      console.log("Questa è la risposta intera");
      console.log(response);
      this.prova = response["matches"];

      let temp = this.prova.filter( (element) => {
        return element.id == localStorage.getItem("IdPartitaIscritto");
      })

      this.dataSourcePartite = new MatTableDataSource(temp);
    } )
  }

  idCorrente; giocatoriPartita; arrayPartitaScelta;
  
  stampaId(element){
    this.idCorrente = element.id;    
    this.vediInnerTabella = true;

    //console.log("idTenant: " + this.utils.idTenant + ", id partita scelta: " + this.idCorrente);
    
    this.auth.getPlayersMatches(localStorage.getItem("idTenantScelto"), this.idCorrente).subscribe( (response) => {
      console.log(JSON.stringify(response));
      
      this.giocatoriPartita = response["players"];
      let temp = this.giocatoriPartita.filter( (player) => {
        return player.idpartita == element.idpartita;
      })
      
      this.arrayPartitaScelta = new MatTableDataSource(temp);
    })
  }
  
  ngOnInit(): void {
    this.retrieveMatches();
  }
}
