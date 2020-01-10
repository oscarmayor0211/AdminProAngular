import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos : number=0;

  constructor(public http : HttpClient , public s_usuario : UsuarioService) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico'

    return this.http.get(url).pipe(map((resp :any) => {
      this.totalMedicos = resp.total;
      console.log(resp);
      return resp.medicos;
    }))
  }

  cargarMedico(id:string){

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url).pipe(map( (resp : any) => resp.medico));
  }

  
  buscarUsuario(termmino : string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/'+ termmino;

    return this.http.get(url).pipe(map((resp:any) => resp.medicos ));

   }

   eliminarMedico(id : string){

    let url = URL_SERVICIOS + '/medico/' + id;
       url += '?token=' + this.s_usuario.token;

       return this.http.delete(url).pipe(map((resp :any) =>{
        Swal.fire('Medico borrado', 'El Medico ha sido eliminado correctamente', 'success');
        return true;
       }));

   }

   guardarMedico(medico : Medico){

    let url = URL_SERVICIOS + '/medico' ;

    if(medico._id){
      // Actualizando medico
      url += '/' + medico._id;
      url += '?token=' + this.s_usuario.token;

      return this.http.put(url , medico ).pipe(map((resp:any) => {
        Swal.fire('Medico Actualizado',medico.nombre, 'success');
        return resp.medico;

      }))

    }else{
      // Creando Medico
      url += '?token=' + this.s_usuario.token;

      return this.http.post(url,medico).pipe(map((resp:any) =>{
        Swal.fire('Medico creado',medico.nombre, 'success');
        return resp.medico;
      }));
    }
    
   }
}
