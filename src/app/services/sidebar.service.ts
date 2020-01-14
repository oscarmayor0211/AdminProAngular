import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // menu : any=[
  //   {
  //     titulo:'Principal',
  //     icono:'mdi mdi-gauge',
  //     submenu:[
  //       {
  //         titulo:'Dashboard', 
  //         url:'/dashboard'
  //       },
  //       {
  //         titulo:'ProgressBar', 
  //         url:'/progress'
  //       },
  //       {
  //         titulo:'Graficas', 
  //         url:'/graficas1'
  //       },
  //       {
  //         titulo:'Promesas', 
  //         url:'/promesas'
  //       },
  //       {
  //         titulo:'Observables', 
  //         url:'/rxjs'
  //       }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono : 'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {titulo : 'Usuarios' , url: '/usuarios'},
  //       {titulo : 'Hospitales' , url: '/hospitales'},
  //       {titulo : 'Medicos' , url:'/medicos'}
  //     ]
  //   }
  // ];

  menu : any[] =[]
  constructor( public s_usuario : UsuarioService) {


   }

   cargarMenu(){
    this.menu = this.s_usuario.menu;

   }
}
