import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario : Usuario;

  constructor(public s_usuario : UsuarioService) { }

  ngOnInit() {
    this.usuario = this.s_usuario.usuario;
  }

}
