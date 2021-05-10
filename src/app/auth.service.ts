import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  urlgetTenants = "http://172.16.223.244:8080/getTenants"

  urlCreateTenant = "http://172.16.223.244:8080/createTenant"

  urlCreatePlayer = "http://172.16.223.244:8080/"

  urlGetMatches = "http://172.16.223.244:8080/"

  urlLogin = "http://172.16.223.244:8080/loginTenant/"

  get(){
    return this.http.get(this.urlgetTenants)
  }

  postRequest(body){
    console.log("body del admin che sto mandando" + body);
    return this.http.post(this.urlCreateTenant, body)
  }

  postRequestPlayer(body, idTenant){
    console.log("body del giocatore che sto mandando" + body);
    return this.http.post(this.urlCreatePlayer + idTenant + "/createPlayer", body)
  }

  getMatches(idTenant){
    console.log(this.urlGetMatches + idTenant + "/getMatches");
    
    return this.http.get(this.urlGetMatches + idTenant + "/getMatches");
  }

  createMatches(idTenant, body){
    console.log(body);
    
    return this.http.post(this.urlGetMatches + idTenant + "/createMatch", body);
  }

  login(email, password){
    const invia = {
      email : email,
      password : password
    }
    console.log("link: "+this.urlLogin+email + "/" +  password);
    
    return this.http.post(this.urlLogin+ email + "/" +  password, invia)
  }

}
