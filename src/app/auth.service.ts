import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = "http://172.16.223.244:8080/getTenants"

  // TODO da togliere è prova
  url2 = "http://172.16.223.244:8080/1/getPlayers"

  get(){
    return this.http.get(this.url)
  }

  // TODO da togliere è prova
  get2(){
    return this.http.get(this.url2)
  }

}
