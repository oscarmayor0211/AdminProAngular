import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {


  usuarios : Usuario[]=[];
  desde : number = 0;
  totalRegistros : number = 0;
  cargando : boolean = true;

  constructor( public s_usuario : UsuarioService , public s_modalupload : ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.s_modalupload.notificacion.subscribe( resp =>{
      this.cargarUsuarios();
    });
  }


  cargarUsuarios(){

    this.cargando= true;

    this.s_usuario.cargarUsuarios(this.desde).subscribe( (resp:any) => {
      console.log(resp);

      this.totalRegistros = resp.total;
      this.usuarios= resp.usuarios;

      this.cargando=false;
    });
  }

  cambiarDesde( valor : number){

    let desde = this.desde + valor;

    if( desde >= this.totalRegistros){
      Swal.fire('No hay mas registros','la cantidad de registros son ' + this.totalRegistros , 'info');
      return;
    }

    if(desde  < 0){
      return;
    }

    this.desde += valor;

    this.cargarUsuarios();

  }

  buscarUsuario ( termino : string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.s_usuario.buscarUsuario( termino ).subscribe((usuarios :Usuario[])=> {

      this.usuarios=usuarios;
      this.cargando = false;

    });
  }
  
  borrarUsuario(usuario : Usuario){

    if(usuario._id === this.s_usuario.usuario._id){
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo' , 'error');
      return;
    }

    Swal.fire({
      title:'¿Estas Seguro?',
      text:'Esta a punto de borrar a ' + usuario.nombre,
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then( borrar => {
      if(borrar){
        this.s_usuario.borrarUsuario(usuario._id).subscribe( resp => {
          console.log(resp);
          this.cargarUsuarios();
        });
      }
    })
  }

  // aqui se guarda el usuario de mantenimiento
  guardarUsuario( usuario : Usuario){

    this.s_usuario.actualizarUsuario(usuario).subscribe();

  }

  mostrarModal(id :string){
    this.s_modalupload.mostrarModal('usuarios', id);
  }
}
