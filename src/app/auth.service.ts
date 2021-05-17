import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  urlgetTenants = "http://172.16.223.244:8080/getTenants"

  urlCreateTenant = "http://172.16.223.244:8080/createTenant"

  urlbase = "http://172.16.223.244:8080/"

  urlLogin = "http://172.16.223.244:8080/loginTenant/"
  urlLoginPlayer = "http://172.16.223.244:8080/loginPlayer/"

  get(){
    return this.http.get(this.urlgetTenants)
  }

  postRequest(body){
    console.log("body del admin che sto mandando" + body);
    return this.http.post(this.urlCreateTenant, body)
  }

  updateMatch(idTenant, idPartita, body){
    return this.http.patch(this.urlbase + idTenant + "/updateMatch/" + idPartita, body);
  }

  deleteMatch(idTenant, idPartita){
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

  getPlayersMatches(idTenant, idMatch){
    return this.http.get(this.urlbase + idTenant + "/getMatchPlayers/" + idMatch);
  }

  addFeedbackUtente(idTenant, idPlayer, idMatch, body){
    console.log(this.urlbase + idTenant + "/" + idMatch + "/updatePlayerRating/" + idPlayer);
    
    return this.http.patch(this.urlbase + idTenant + "/" + idMatch + "/updatePlayerRating/" + idPlayer, body)
  }

  addFeedbackStruttura(idPlayer, idTenant, body){
    return this.http.post(this.urlbase + idPlayer + "/createReview/" + idTenant, body)
  }

  getTenantReviews(idTenant){
    return this.http.get(this.urlbase + "getTenantReviews/" + idTenant);
  }

  getPlayerReviews(idPlayer){
    return this.http.get(this.urlbase + "getPlayerReviews/" + idPlayer);
  }

  postRequestPlayer(body, idTenant){
    console.log("link create player" + this.urlbase + idTenant + "/createPlayer", body);
    return this.http.post(this.urlbase + idTenant + "/createPlayer", body)
  }

  getMatches(idTenant){
    console.log(this.urlbase + idTenant + "/getMatches");
    
    return this.http.get(this.urlbase + idTenant + "/getMatches");
  }

  createMatches(idTenant, body){
    console.log(body);
    
    return this.http.post(this.urlbase + idTenant + "/createMatch", body);
  }

  login(email, password){
    const invia = {
      email : email,
      password : password
    }
    console.log("link: "+this.urlLogin+email + "/" +  password);
    
    return this.http.post(this.urlLogin+ email + "/" +  password, invia)
  }

  loginPlayer(email, password){
    const invia = {
      email : email,
      password : password
    }
    console.log("link: "+this.urlLoginPlayer+email + "/" +  password);
    
    return this.http.post(this.urlLoginPlayer+ email + "/" +  password, invia)
  }
}
