import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = "http://172.16.223.244:8080/getTenants"

  get(){
    return this.http.get(this.url)
  }

}
