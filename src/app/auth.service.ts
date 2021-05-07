import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = "http://172.16.223.244:8080/getTenants"

  urlCreate = "http://172.16.223.244:8080/createTenant"
  
  get(){
    return this.http.get(this.url)
  }

  postRequest(body){
    //const bodyJson = JSON.stringify(body)
    // console.log("bodyjson " + body["cap"]);
    console.log(body);
    
    return this.http.post(this.urlCreate, body);
  }

  /* TODO da togliere è prova
  url2 = "http://172.16.223.244:8080/1/getPlayers"

  get2(){
    return this.http.get(this.url2)
  }
  */

}
