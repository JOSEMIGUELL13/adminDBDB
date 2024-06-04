import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './Objects/Usuario';
import { Membresia } from './Objects/Membresia';
import { RegistroPdf } from './Objects/RegistroPdf';
import { Admon } from './Objects/Admon';
import { Asistencia } from './Objects/Asistencia';
import { Transaccion } from './Objects/Transaccion';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  //url:String = "http://localhost:3000/";
  //url:String = "https://project.cclmtechsolutions.online/";
  //url:String = "https://pruebas.cclmtechsolutions.online/";
  url:String = "http://localhost:8080/phpAngular/Gimnasio/";

  selectMembresias(){
    return this.httpClient.get(`${this.url}selectMembresia.php`);
    //return this.httpClient.get(`${this.url}Membresia`);
  }
  selectUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.url}selectUsuario.php`);
    //return this.httpClient.get<Usuario[]>(`${this.url}Usuario`);
  }
  selectTransacciones(){
    return this.httpClient.get(`${this.url}selectTransaccion.php`);
    //return this.httpClient.get(`${this.url}Transaccion`);
  }
  selectRegistrosPdf(){
    return this.httpClient.get(`${this.url}selectRegistrosPdf.php`);
    //return this.httpClient.get(`${this.url}RegistrosPDF`);
  }


  insertMembresia(membresia:Membresia){
    return this.httpClient.post(`${this.url}insertMembresia.php`, JSON.stringify(membresia));
    //return this.httpClient.post(`${this.url}InsertMembresia`, membresia);
  }
  insertRegistroPdf(registroPdf:RegistroPdf){
    return this.httpClient.post(`${this.url}insertRegistrosPdf.php`, JSON.stringify(registroPdf));
    //return this.httpClient.post(`${this.url}InsertRegistrosPdf`, registroPdf);
  }
  insertUsuario(usuario:Usuario){
    return this.httpClient.post(`${this.url}insertUsuario.php`, JSON.stringify(usuario));
    //return this.httpClient.post(`${this.url}InsertUsuario`, usuario);
  }
  insertTransaccion(transaccion:Transaccion){
    if(transaccion.idUsuario === undefined)
      transaccion.idUsuario = -1;
    return this.httpClient.post(`${this.url}insertTransaccion.php`, JSON.stringify(transaccion));
    //return this.httpClient.post(`${this.url}InsertTransaccion`, transaccion);
  }
  insertAdmonExpress(admon: Admon){
    return this.httpClient.post(`${this.url}insertAdmon.php`, JSON.stringify(admon));
    //return this.httpClient.post(`${this.url}insertAdmon`, admon);
  }

  updateMembresia(membresia:Membresia){
    return this.httpClient.put(`${this.url}updateMembresia.php`, JSON.stringify(membresia));
    //return this.httpClient.put(`${this.url}UpdateMembresia/${membresia.idUsuario}`, membresia);
  }

  updateUsuario(usuario:Usuario){
    return this.httpClient.put(`${this.url}updateUsuario.php`, JSON.stringify(usuario));
    //return this.httpClient.put(`${this.url}UpdateUsuario/${usuario.idUsuario}`, usuario);
  }


  authorization(admon: Admon){
    return this.httpClient.post(`${this.url}login.php`, JSON.stringify(admon));
    //return this.httpClient.post(`${this.url}authorization`, admon);
  }
  verificToken(token:any){
    let headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': token
    });
    return this.httpClient.post(`${this.url}token`, {}, {headers});
  }
  verificaAdmon(admon: Admon){
    return this.httpClient.post(`${this.url}verificAdmon.php`, JSON.stringify(admon));
    //return this.httpClient.post(`${this.url}verificAdmon`, admon);
  }

  asistencia(asistencia: Asistencia){
    return this.httpClient.post(`${this.url}asistencia.php`, JSON.stringify(asistencia));
  }

  selectAsistencia(){
    return this.httpClient.get(`${this.url}selectAsistencia.php`);
    //return this.httpClient.get(`${this.url}selectAsistencia`);
  }

}
