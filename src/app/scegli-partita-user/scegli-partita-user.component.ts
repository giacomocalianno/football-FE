import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scegli-partita-user',
  templateUrl: './scegli-partita-user.component.html',
  styleUrls: ['./scegli-partita-user.component.scss']
})
export class ScegliPartitaUserComponent implements OnInit {

  displayedColumns: string[] = ['checkbox', 'nomecampo', 'ora', 'data'];
  dataSource = [
    { nomecampo : "ELIS", ora: "14:30", data: "12/3/2021"}, { nomecampo : "SAFI", ora: "19:30", data: "12/3/2021"}, 
    { nomecampo : "Armando", ora: "14:00", data: "12/3/2021"}, { nomecampo : "Strazza", ora: "16:30", data: "12/3/2021"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
