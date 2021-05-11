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

  updateTenant(idTenant, idPartita, body){
    return this.http.patch(this.urlbase + idTenant + "/updateMatch/" + idPartita, body);
  }

  deleteTenant(idTenant, body){
    return this.http.delete(this.urlbase + "deleteTenant/" + idTenant, body);
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
