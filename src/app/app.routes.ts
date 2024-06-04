import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { VistaClienteComponent } from './vista-cliente/vista-cliente.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { FinanzasComponent } from './finanzas/finanzas.component';
import { ListaMembresiasComponent } from './lista-membresias/lista-membresias.component';
import { ListaRegistrosComponent } from './lista-registros/lista-registros.component';
import { MainComponent } from './main/main.component';
import { MembresiaComponent } from './membresia/membresia.component';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { VisitaComponent } from './visita/visita.component';
import { ModificarDatosComponent } from './modificar-datos/modificar-datos.component';
import { LoginGuardian } from './login/login-guardian';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Home', component:HomeComponent},
  {path: 'Asistencia', component:AsistenciaComponent},
  {path: 'Cliente', component: VistaClienteComponent,
    children: [{path: 'Home', component:HomeComponent},
              {path: 'Asistencia', component:AsistenciaComponent}]},
  {path: 'Main', component: MainComponent, canActivate:[LoginGuardian],
    children: [{path:'Usuario', component: UsuarioComponent},
              {path: 'Registros', component: ListaRegistrosComponent},
              {path: 'ListaMembresias', component: ListaMembresiasComponent},
              {path: 'Membresia/:id', component: MembresiaComponent},
              {path: 'Modificar', component: ModificarDatosComponent},
              {path: 'Finanzas', component:FinanzasComponent},
              {path: 'Visita', component:VisitaComponent}]},
  {path: '**', component: PaginaErrorComponent},
];
