import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token : string;
  hospital : Hospital;
  totalHospitales: number = 0;
  constructor(public http : HttpClient ,public s_usuarioserv : UsuarioService) { 
  }


  cargarHospitales(desde : number = 0){

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url).pipe(map(( resp : any ) => {

      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));

  }

  // Obtener hospital por id
  obtenerHospital(id:string){

    let url = URL_SERVICIOS +'/hospital/' + id;

    return this.http.get(url).pipe(map((resp:any)=> resp.hospital
    ));

  }

  buscarHospital(termino : string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/'+termino;

    return this.http.get(url).pipe(map((resp:any) =>resp.hospitales
    ));

  }


  actualizarHospital(hospital:Hospital){

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
        url +='?token=' + this.s_usuarioserv.token;

    return this.http.put(url , hospital).pipe(map( (resp:any) => {
     
      Swal.fire('Usuario actualizado', hospital.nombre, 'success');

      return true;
    }));

   }

   borrarHospital(id :string){

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.s_usuarioserv.token;
    
    return this.http.delete(url).pipe(map( resp => {
      Swal.fire('Hospital borrado', 'El Hospital ha sido eliminado correctamente', 'success');
      return true;
    }));

   }

   crearHospital(nombre : string){
    let url = URL_SERVICIOS + '/hospital' + '?token=' +  this.s_usuarioserv.token;

    return this.http.post(url , {nombre:nombre}).pipe(map( (resp :any) => {
      
      return resp.hospital;
    }))
   }

  
}
