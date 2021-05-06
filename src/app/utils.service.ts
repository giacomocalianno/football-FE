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

  emailAdmin;
  passwordAdmin;
  nomestruttura;
  citta;
  via;
  cap;

  constructor() { }
}
