import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = "http://172.16.223.244:8080/getTenants"

  urlCreateTenant = "http://172.16.223.244:8080/createTenant"

  urlCreatePlayer = "http://172.16.223.244:8080/"
  
  get(){
    return this.http.get(this.url)
  }

  postRequest(body){
    console.log("body del admin che sto mandando" + body);
    return this.http.post(this.urlCreateTenant, body)
  }

  postRequestPlayer(body, idTenant){
    console.log("body del giocatore che sto mandando" + body);
    return this.http.post(this.urlCreatePlayer + idTenant + "/createPlayer", body)
  }

  /* TODO da togliere è prova
  url2 = "http://172.16.223.244:8080/1/getPlayers"

  get2(){
    return this.http.get(this.url2)
  }
  */

}
