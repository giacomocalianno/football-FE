import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  nome;
  cognome;
  email;
  password;
  autovalutazione;
  ruolo;
  idTenant;

  idPartitaSceltaUtente;

  emailAdmin;
  passwordAdmin;
  nomestruttura;
  citta;
  via;
  cap;

  idPartitaUpdate; // l'id partita che l'admin ha scelto di modificare

  constructor() { }
}
