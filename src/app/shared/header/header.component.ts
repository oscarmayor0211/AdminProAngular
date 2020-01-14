import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuarios.model';
import { Router } from '@angular/router';

// declare function init_plugin();


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario : Usuario;

  constructor(public s_usuario : UsuarioService, public router : Router) { }

  ngOnInit() {
    // init_plugin();
    this.usuario = this.s_usuario.usuario;
  }

  buscar( termino:string){
    this.router.navigate (['/busqueda' , termino]);
  }
}
