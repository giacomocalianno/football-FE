import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  // urlbase = "https://prenotazionecalcio.russi.ovh/api/"
  urlbase = "http://172.16.223.169:8080/"

  get(){
    // prendo tutti i tenant 
    console.log("link: " + this.urlbase + "getTenants");
    return this.http.get(this.urlbase + "getTenants")
  }

  postRequest(body){
    // creo il tenant
    console.log("body del admin che sto mandando" + body);
    console.log("link: " + this.urlbase + "createTenant");
    
    return this.http.post(this.urlbase + "createTenant", body);
  }

  updateMatch(idTenant, idPartita, body){
    // modifico il match
    console.log("link: " + this.urlbase + idTenant + "/updateMatch/" + idPartita);

    return this.http.patch(this.urlbase + idTenant + "/updateMatch/" + idPartita, body);
  }

  deleteMatch(idTenant, idPartita){
    // cancello il match
    console.log("link: " + this.urlbase + idTenant + "/deleteMatch/" + idPartita);

    return this.http.delete(this.urlbase + idTenant + "/deleteMatch/" + idPartita);
  }

  updatePlayer(idTenant, idPlayer, body){
    // modifico il giocatore
    console.log("link dell'update utente: "+ this.urlbase + idTenant + "/updatePlayer/" + idPlayer);
    
    return this.http.patch(this.urlbase + idTenant + "/updatePlayer/" + idPlayer, body)
  }

  iscriviPlayer(idTenant, idPlayer, idMatch, body){
    // iscrivo il giocatore
    console.log("Link dell'iscrizione: " + this.urlbase + idTenant + "/" + idPlayer + "/signToMatch/" + idMatch);
    
    return this.http.patch(this.urlbase + idTenant + "/" + idPlayer + "/signToMatch/" + idMatch, body)
  }

  removePlayers(idTenant, idGame, body){
    // rimuovo il giocatore
    return this.http.patch(this.urlbase + idTenant + "/" + idGame + "/removePlayers", body);
  }

  getPlayersMatches(idTenant, idMatch){
    // prendo i giocatori dal match
    console.log("link: " + this.urlbase + idTenant + "/getMatchPlayers/" + idMatch);

    return this.http.get(this.urlbase + idTenant + "/getMatchPlayers/" + idMatch);
  }

  addFeedbackUtente(idTenant, idPlayer, idMatch, body){
    // aggiungo il feedback all'utente
    console.log(this.urlbase + idTenant + "/" + idMatch + "/updatePlayerRating/" + idPlayer);
    
    return this.http.patch(this.urlbase + idTenant + "/" + idMatch + "/updatePlayerRating/" + idPlayer, body)
  }

  addFeedbackStruttura(idPlayer, idTenant, body){
    // aggiungo il feedback alla struttura
    console.log("link: " + this.urlbase + idPlayer + "/createReview/" + idTenant);

    return this.http.post(this.urlbase + idPlayer + "/createReview/" + idTenant, body)
  }

  getStorico(idTenant, idPlayer){
    // prendo lo storico di partite dell'utente
    console.log("link: " + this.urlbase + idTenant + "/" + idPlayer + "/getMatches");

    return this.http.get(this.urlbase + idTenant + "/" + idPlayer + "/getMatches")
  }

  createTeams(idTenant, body){
    // creo il team
    return this.http.post(this.urlbase + idTenant + "/createTeam", body);
  }

  getTeams(idTenant){
    // prendo tutti i team di un tenant
    return this.http.get(this.urlbase + idTenant + "/getTeams");
  }

  getTenantTeam(idTenant, idTeam){
    // prendo un team di un tenant
    return this.http.get(this.urlbase + idTenant + "/getTeam/" + idTeam);
  }

  updateTeam(idTenant, idTeam, body){
    // modifica il team
    return this.http.put(this.urlbase + idTenant + "/updateTeam/" + idTeam, body)
  }

  getTeamPlayers(idTenant, idGame, idTeam){
    // prendi tutti i giocatori dal team
    console.log("link: " + this.urlbase + idTenant + "/" + idGame + "/getTeamPlayers/" + idTeam);
    
    return this.http.get(this.urlbase + idTenant + "/" + idGame + "/getTeamPlayers/" + idTeam);
  }

  buildTeams(idTenant, idGame){
    // costruisci squadre
    console.log("link: " + this.urlbase + idTenant + "/" + idGame + "/buildTeams");
    return this.http.patch(this.urlbase + idTenant + "/" + idGame + "/buildTeams", null);
  }

  getTenantReviews(idTenant){
    // prendi i feedback del tenant
    console.log("link: " + this.urlbase + "getTenantReviews/" + idTenant);

    return this.http.get(this.urlbase + "getTenantReviews/" + idTenant);
  }

  getPlayerReviews(idPlayer){
    // prendi i feedback sull'utente
    console.log("link: " + this.urlbase + "getPlayerReviews/" + idPlayer);

    return this.http.get(this.urlbase + "getPlayerReviews/" + idPlayer);
  }

  postRequestPlayer(body, idTenant){
    // crea giocatore
    console.log("link create player" + this.urlbase + idTenant + "/createPlayer", body);
    return this.http.post(this.urlbase + idTenant + "/createPlayer", body)
  }

  removePlayer(idTenant, idGame, idPlayer, body){
    // rimuovi giocatore
    console.log("link: " + this.urlbase + idTenant + "/" + idGame + "/removePlayer/" + idPlayer);
    return this.http.patch(this.urlbase + idTenant + "/" + idGame + "/removePlayer/" + idPlayer, body)
  }

  getMatches(idTenant){
    // prendi tutti i match di un tenant
    console.log("link: " + this.urlbase + idTenant + "/getMatches");
    
    return this.http.get(this.urlbase + idTenant + "/getMatches");
  }

  createMatches(idTenant, body){
    // crea un match 
    console.log(body);
    console.log("link: " + this.urlbase + idTenant + "/createMatch");
    
    return this.http.post(this.urlbase + idTenant + "/createMatch", body);
  }

  login(email, password){
    // fai la login dell'admin
    const invia = {
      email : email,
      password : password
    }
    console.log("link: "+this.urlbase + "loginTenant/" + email + "/" +  password);
    
    return this.http.post(this.urlbase + "loginTenant/" + email + "/" +  password, invia)
  }

  loginPlayer(email, password){
    // fai la login del giocatore
    const invia = {
      email : email,
      password : password
    }
    console.log("link: "+this.urlbase + "loginPlayer/" + email + "/" +  password);
    
    return this.http.post(this.urlbase + "loginPlayer/" + email + "/" +  password, invia)
  }
}

