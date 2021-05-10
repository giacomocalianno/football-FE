import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilsService } from '../utils.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-scegli-partita-user',
  templateUrl: './scegli-partita-user.component.html',
  styleUrls: ['./scegli-partita-user.component.scss']
})
export class ScegliPartitaUserComponent implements OnInit {

  constructor(private auth: AuthService, private utils: UtilsService) { }

  displayedColumns: string[] = ['checkbox', 'id', 'ora', 'data'];

  dataSource; prova;
  
  retrieveMatches(){
    this.auth.getMatches(this.utils.idTenant).subscribe( (response) => {
        console.log(response);
        this.prova = response;
        this.dataSource = new MatTableDataSource(this.prova);
    } )
  }

  stampaId(id){
    console.log("id: " + id);
    this.utils.idPartitaSceltaUtente = id;
    console.log("utils.tentant ora è: " + this.utils.idPartitaSceltaUtente);
  }

  ngOnInit(): void {
  }

}
