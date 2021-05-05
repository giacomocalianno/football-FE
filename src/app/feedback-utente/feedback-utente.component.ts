import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-utente',
  templateUrl: './feedback-utente.component.html',
  styleUrls: ['./feedback-utente.component.scss']
})
export class FeedbackUtenteComponent implements OnInit {
  
  currentRateRecensione = 0;
  currentRateRecensione2 = 0;
  currentRate = 5;
  currentRate2 = 3;
  currentRate3 = 4;

  constructor() { }

  ngOnInit(): void {
  }

}
