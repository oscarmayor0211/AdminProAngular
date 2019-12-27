import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario : Usuario;

  imagenSubir : File;

  imagenTemporal : string | ArrayBuffer;

  constructor(public s_usuario : UsuarioService) {

    this.usuario = s_usuario.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario : Usuario){

    this.usuario.nombre = usuario.nombre;

    if(!this.usuario.google){
      this.usuario.email = usuario.email;

    }

    this.s_usuario.actualizarUsuario( this.usuario).subscribe( resp => {
      console.log(resp);
    });

    console.log(usuario);
  }

  seleccionImagen( archivo : File) {

    if(!archivo){
      this.imagenSubir=null;
      return
    }
    if(archivo.type.indexOf('image')){
      Swal.fire('Solo imagenes','El archivo seleccionado no es una imagen' ,'error');
      this.imagenSubir=null;
      return
    }   
    this.imagenSubir=archivo;

    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal=reader.result;
  }

  cambiarImagen(){
    this.s_usuario.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
