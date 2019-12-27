import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario : Usuario;
  constructor( public s_sidebar : SidebarService , public s_service : UsuarioService) { 
    
  }

  ngOnInit() {
    this.usuario = this.s_service.usuario;
  }

}
