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
  

  contenutoDrawer = [
    {nome : 'Buoni spesa'}, {nome : 'Buoni speciali'}, {nome : 'Transazioni'},
    {nome : 'Fatture'}, {nome : 'Donazioni'}, {nome : 'Utenti'}, {nome : 'Attività commerciali'}, {nome : 'Logout'},
]

  constructor() { }
}
