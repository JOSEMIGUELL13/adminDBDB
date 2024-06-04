import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { Membresia } from './Objects/Membresia';
import { DataService } from './data.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(15px)' })),
      ]),
    ])
  ]
})
export class AppComponent {
  login:boolean = true;
  body:boolean = false;
  show:boolean = true;
  cliente:boolean = true;

  membresias:Membresia[] = [];

  constructor(private ServiceDataMysql:ApiService,
            private cookies:CookieService, private router:Router,
            private service:DataService, private routerAc:ActivatedRoute){}

  ngOnInit(){

    // Cargando los datos del servidor...

    this.service.findUsuarios();

    this.service.findAsistencias();

    this.service.findRegistrosPdf();

    this.service.findTransacciones();

    this.ServiceDataMysql.selectMembresias().subscribe(async memb=>{
      if(!(memb === null)){
        this.membresias = Object.values(memb);
        for(let i = 0; i < this.membresias.length; i++){
          if(this.checkMembresias(i)){
            this.membresias[i].monto = 250;
            this.ServiceDataMysql.updateMembresia(this.membresias[i]).subscribe(re=>{
              if(this.membresias.length-1 === i)
                this.service.findMembresias();
            });
          }
        }
        this.service.findMembresias();
    }});
  }

  checkMembresias(i:number):boolean{
    if(this.membresias[i].monto > 0) return false;
    let date = new Date(this.membresias[i].fechaExpiracion.toString());
    let fecha = new Date();
    let membresiaYer = date.getFullYear();
    let membresiaMes = date.getMonth()+1;
    let membresiaDia = date.getDate();

    if(membresiaYer > fecha.getFullYear()) return false;
    if(fecha.getFullYear() > membresiaYer)
      return true;
    if(fecha.getMonth()+1 > membresiaMes) return true;
    else if(fecha.getMonth()+1 === membresiaMes)
      if(fecha.getDate() > membresiaDia)
        return true;
    return false;
  }

  getFechaActual():String{
    let day = new Date().getDate();
    let mes = new Date().getMonth()+1;
    let anio = new Date().getFullYear();
    return day+"/"+mes+"/"+anio;
  }

  logOut(){
    if(this.cookies.get("token") !== ""){
      this.cookies.set("token", "");
      this.router.navigate(['']);
    }
  }

  log(){
    if(this.cookies.get("token") === ""){
      this.router.navigate(['']);
    }
  }

  ngDoCheck(){
    let url = this.router.url.toString()
    if(url.split("/")[1] == "Cliente") this.cliente = false;
    else this.cliente = true;
  }

  routerHome(){
    let url = this.router.url.toString()
    if(url == "/Cliente/Asistencia" || url == "/Cliente"){
      this.router.navigate(['/Cliente/Home']);
      this.cookies.set("token", "");
    }
    else
      this.router.navigate(['/Home']);
  }

  routerCliente(){
    let url = this.router.url.toString();
    console.log(url);
    if(url == "/" || url == "/Main")
      this.router.navigate(["/Asistencia"]);
    else
    this.router.navigate(["Cliente/Asistencia"]);
  }
}
