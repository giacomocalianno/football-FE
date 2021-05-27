import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // urlgetTenants = "http://172.16.223.244:8080/getTenants"
  // urlCreateTenant = "http://172.16.223.244:8080/createTenant"
  // urlLogin = "http://172.16.223.244:8080/loginTenant/"
  // urlLoginPlayer = "http://172.16.223.244:8080/loginPlayer/" 

  urlbase = "https://prenotazionecalcio.russi.ovh/api/"

  get(){
    console.log("link: " + this.urlbase + "getTenants");
    
    return this.http.get(this.urlbase + "getTenants")
  }

  postRequest(body){
    console.log("body del admin che sto mandando" + body);
    console.log("link: " + this.urlbase + "createTenant");
    
    return this.http.post(this.urlbase + "createTenant", body)
  }

  updateMatch(idTenant, idPartita, body){
    console.log("link: " + this.urlbase + idTenant + "/updateMatch/" + idPartita);

    return this.http.patch(this.urlbase + idTenant + "/updateMatch/" + idPartita, body);
  }

  deleteMatch(idTenant, idPartita){
    console.log("link: " + this.urlbase + idTenant + "/deleteMatch/" + idPartita);

    return this.http.delete(this.urlbase + idTenant + "/deleteMatch/" + idPartita);
  }

  updatePlayer(idTenant, idPlayer, body){

    console.log("link dell'update utente: "+ this.urlbase + idTenant + "/updatePlayer/" + idPlayer);
    
    return this.http.patch(this.urlbase + idTenant + "/updatePlayer/" + idPlayer, body)
  }

  iscriviPlayer(idTenant, idPlayer, idMatch, body){
    console.log("Link dell'iscrizione: " + this.urlbase + idTenant + "/" + idPlayer + "/signToMatch/" + idMatch);
    
    return this.http.patch(this.urlbase + idTenant + "/" + idPlayer + "/signToMatch/" + idMatch, body)
  }

  removePlayers(idTenant, idGame, body){
    return this.http.patch(this.urlbase + idTenant + "/" + idGame + "/removePlayers", body);
  }

  getPlayersMatches(idTenant, idMatch){
    console.log("link: " + this.urlbase + idTenant + "/getMatchPlayers/" + idMatch);

    return this.http.get(this.urlbase + idTenant + "/getMatchPlayers/" + idMatch);
  }

  addFeedbackUtente(idTenant, idPlayer, idMatch, body){
    console.log(this.urlbase + idTenant + "/" + idMatch + "/updatePlayerRating/" + idPlayer);
    
    return this.http.patch(this.urlbase + idTenant + "/" + idMatch + "/updatePlayerRating/" + idPlayer, body)
  }

  addFeedbackStruttura(idPlayer, idTenant, body){
    console.log("link: " + this.urlbase + idPlayer + "/createReview/" + idTenant);

    return this.http.post(this.urlbase + idPlayer + "/createReview/" + idTenant, body)
  }

  getStorico(idTenant, idPlayer){
    console.log("link: " + this.urlbase + idTenant + "/" + idPlayer + "/getMatches");

    return this.http.get(this.urlbase + idTenant + "/" + idPlayer + "/getMatches")
  }

  createTeams(idTenant, body){
    return this.http.post(this.urlbase + idTenant + "/createTeam", body);
  }

  getTeams(idTenant){
    return this.http.get(this.urlbase + idTenant + "/getTeams");
  }

  getTenantTeam(idTenant, idTeam){
    return this.http.get(this.urlbase + idTenant + "/getTeam/" + idTeam);
  }

  updateTeam(idTenant, idTeam, body){
    return this.http.put(this.urlbase + idTenant + "/updateTeam/" + idTeam, body)
  }

  getTeamPlayers(idTenant, idGame, idTeam){
    console.log("link: " + this.urlbase + idTenant + "/" + idGame + "/getTeamPlayers/" + idTeam);
    
    return this.http.get(this.urlbase + idTenant + "/" + idGame + "/getTeamPlayers/" + idTeam);
  }

  buildTeams(idTenant, idGame){
    console.log("link: " + this.urlbase + idTenant + "/" + idGame + "/buildTeams");
    return this.http.patch(this.urlbase + idTenant + "/" + idGame + "/buildTeams", null);
  }

  getTenantReviews(idTenant){
    console.log("link: " + this.urlbase + "getTenantReviews/" + idTenant);

    return this.http.get(this.urlbase + "getTenantReviews/" + idTenant);
  }

  getPlayerReviews(idPlayer){
    console.log("link: " + this.urlbase + "getPlayerReviews/" + idPlayer);

    return this.http.get(this.urlbase + "getPlayerReviews/" + idPlayer);
  }

  postRequestPlayer(body, idTenant){
    console.log("link create player" + this.urlbase + idTenant + "/createPlayer", body);
    return this.http.post(this.urlbase + idTenant + "/createPlayer", body)
  }

  removePlayer(idTenant, idGame, idPlayer, body){
    console.log("link: " + this.urlbase + idTenant + "/" + idGame + "/removePlayer/" + idPlayer);
    return this.http.patch(this.urlbase + idTenant + "/" + idGame + "/removePlayer/" + idPlayer, body)
  }

  getMatches(idTenant){
    console.log("link: " + this.urlbase + idTenant + "/getMatches");
    
    return this.http.get(this.urlbase + idTenant + "/getMatches");
  }

  createMatches(idTenant, body){
    console.log(body);
    console.log("link: " + this.urlbase + idTenant + "/createMatch");
    
    return this.http.post(this.urlbase + idTenant + "/createMatch", body);
  }

  login(email, password){
    const invia = {
      email : email,
      password : password
    }
    console.log("link: "+this.urlbase + "loginTenant/" + email + "/" +  password);
    
    return this.http.post(this.urlbase + "loginTenant/" + email + "/" +  password, invia)
  }

  loginPlayer(email, password){
    const invia = {
      email : email,
      password : password
    }
    console.log("link: "+this.urlbase + "loginPlayer/" + email + "/" +  password);
    
    return this.http.post(this.urlbase + "loginPlayer/" + email + "/" +  password, invia)
  }
}

