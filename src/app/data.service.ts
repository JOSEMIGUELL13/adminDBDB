import { Injectable } from '@angular/core';
import { Asistencia } from './Objects/Asistencia';
import { Membresia } from './Objects/Membresia';
import { RegistroPdf } from './Objects/RegistroPdf';
import { Transaccion } from './Objects/Transaccion';
import { Usuario } from './Objects/Usuario';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usuarios: Usuario[] = [];
  private asistencias: Asistencia[] = [];
  private membresias: Membresia[] = [];
  private registrosPDf: RegistroPdf[] = [];
  private transacciones: Transaccion[] = [];

  constructor(private service:ApiService) { }

  findUsuarios(){
    this.service.selectUsuarios().subscribe(re=>{
      if(re != null)
        this.usuarios = re;
    });
  }
  getUsuarios(){ return this.usuarios; }

  findAsistencias(){
    this.service.selectAsistencia().subscribe(re=>{
      if(re != null)
        this.asistencias = Object.values(re);
    });
  }
  getAsistencias(){ return this.asistencias; }

  findMembresias(){
    this.service.selectMembresias().subscribe(re=>{
      this.membresias = Object.values(re);
    })
  }
  getMembresias(){ return this.membresias; }

  findRegistrosPdf(){
    this.service.selectRegistrosPdf().subscribe(re=>{
      this.registrosPDf = Object.values(re);
    })
  }
  getRegistrosPdf(){ return this.registrosPDf; }

  findTransacciones(){
    this.service.selectTransacciones().subscribe(re=>{
      this.transacciones = Object.values(re);
    })
  }
  getTransacciones(){ return this.transacciones }
}
