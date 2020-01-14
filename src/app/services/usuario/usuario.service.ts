import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { HttpClient} from '@angular/common/http'
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import {Observable, throwError} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario : Usuario;
  token :string;
  menu : any = [];

  constructor( public http : HttpClient , public router : Router , public s_subirArchivo : SubirArchivoService) {
    this.cargarStorage();
   }

   login( usuario : Usuario , recordar : boolean){

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + "/login";

    return this.http.post(url , usuario).pipe(  map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }),

    catchError(err => {
      Swal.fire('Error en el login', err.error.mensaje , 'error')
      return throwError(err.message);
    })
  );
  }

   crearUsuario(usuario : Usuario){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url , usuario).pipe(map((resp:any) =>{
      Swal.fire('Usuario creado', usuario.email , 'success');
      return resp.usuario;
    }),
    
    catchError(err => {
      Swal.fire(err.error.mensaje, 'El correo ya existe', 'error')
      return throwError(err.message);
    })
    );

   }

   loginGoogle( token : string){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token}).pipe(map( (resp:any) =>{
      this.guardarStorage(resp.id , resp.token , resp.usuario, resp.menu);
      console.log(resp);
      return true;

    }));
   }

   guardarStorage(id : string , token : string , usuario : Usuario , menu : any){

    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('menu',JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
   }

   estaLogueado(){
      return (this.token.length > 5 )? true : false;
   }

   cargarStorage(){
     if( localStorage.getItem('token')){
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
       this.menu = JSON.parse(localStorage.getItem('menu'));

     }else{
        this.token='';
        this.usuario =null;
        this.menu =null;

     }
   }

   logout(){
     this.usuario= null;
     this.token ='';
     this.menu=[];
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');

     this.router.navigate(['/login']);
   }

   actualizarUsuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
        url +='?token=' + this.token;

    return this.http.put(url , usuario).pipe(map( (resp:any) => {

      if(usuario._id === this.usuario._id){
        this.guardarStorage( resp.usuario._id, this.token, resp.usuario, this.menu);
      }
      
      Swal.fire('Usuario actualizado', usuario.nombre, 'success');

      return true;
    }),
    
    
    catchError(err => {
      Swal.fire(err.error.mensaje, 'Error al actualizar' , 'error')
      return throwError(err.message);
    })
    );

   }

   cambiarImagen( archivo : File , id : string){
      this.s_subirArchivo.subirArchivo(archivo,'usuarios',id)
      .then( (resp:any) => {
        console.log(resp);
        this.usuario.img = resp.usuario.img;

        Swal.fire('Imagen Actualizada' , this.usuario.nombre,'success');

        this.guardarStorage(id,this.token,this.usuario, this.menu);
      })
      .catch( resp => {
        console.log(resp);
      });
   }

   cargarUsuarios( desde : number =0){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
   }

   buscarUsuario(termmino : string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/'+ termmino;

    return this.http.get(url).pipe(map((resp:any) => resp.usuarios ));

   }

   borrarUsuario( id: string){

    let url = URL_SERVICIOS + '/usuario/'+ id;

    url += '?token=' + this.token;

    return this.http.delete(url).pipe(map(resp => {
      Swal.fire('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
      return true;
    }));
   }
}
