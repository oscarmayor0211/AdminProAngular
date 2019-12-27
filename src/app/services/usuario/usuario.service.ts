import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { HttpClient} from '@angular/common/http'
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario : Usuario;
  token :string;

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

    return this.http.post(url , usuario).pipe(map((resp : any) =>{

      this.guardarStorage(resp.id , resp.token , resp.usuario);

      // localStorage.setItem('id',resp.id);
      // localStorage.setItem('token',resp.token);
      // localStorage.setItem('usuario',JSON.stringify(resp.id));

      return true;
    }));
  }

   crearUsuario(usuario : Usuario){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url , usuario).pipe(map((resp:any) =>{
      Swal.fire('Usuario creado', usuario.email , 'success');
      return resp.usuario;
    }));

   }

   loginGoogle( token : string){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token}).pipe(map( (resp:any) =>{
      this.guardarStorage(resp.id , resp.token , resp.usuario);
      return true;

    }));
   }

   guardarStorage(id : string , token : string , usuario : Usuario){

    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
   }

   estaLogueado(){
      return (this.token.length > 5 )? true : false;
   }

   cargarStorage(){
     if( localStorage.getItem('token')){
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     }else{
        this.token='';
        this.usuario =null;
     }
   }

   logout(){
     this.usuario= null;
     this.token ='';
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');

     this.router.navigate(['/login']);
   }

   actualizarUsuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
        url +='?token=' + this.token;

        console.log(url);
    return this.http.put(url , usuario).pipe(map( (resp:any) => {
      // this.usuario = resp.usuario;

      this.guardarStorage( resp.usuario._id, this.token, resp.usuario);

      Swal.fire('Usuario actualizado', usuario.nombre, 'success');

      return true;
    }));

   }

   cambiarImagen( archivo : File , id : string){
      this.s_subirArchivo.subirArchivo(archivo,'usuarios',id)
      .then( (resp:any) => {
        console.log(resp);
        this.usuario.img = resp.usuario.img;

        Swal.fire('Imagen Actualizada' , this.usuario.nombre,'success');

        this.guardarStorage(id,this.token,this.usuario);
      })
      .catch( resp => {
        console.log(resp);
      });
   }
}
