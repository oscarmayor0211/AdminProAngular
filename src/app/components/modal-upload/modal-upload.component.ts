import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  
  imagenSubir : File;

  imagenTemporal : string | ArrayBuffer;
  
  constructor( public s_subirArchivo : SubirArchivoService, public s_modalupload : ModalUploadService) {
    console.log('Modal Listo');
   }

  ngOnInit() {
  }

  seleccionImagen( archivo : File) {

    if(!archivo){
      this.imagenSubir=null;
      return
    }
    if(archivo.type.indexOf('image') < 0){
      Swal.fire('Solo imagenes','El archivo seleccionado no es una imagen' ,'error');
      this.imagenSubir=null;
      return
    }   
    this.imagenSubir=archivo;

    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal=reader.result;
  }

  subirImagen(){

    this.s_subirArchivo.subirArchivo( this.imagenSubir, this.s_modalupload.tipo,this.s_modalupload.id)
                                    .then( resp =>{
                                      this.s_modalupload.notificacion.emit(resp);
                                      this.cerrarModal();
                                    })
                                    .catch(resp => {
                                      console.log('error en la carga');
                                    });
  }

  cerrarModal(){
    this.imagenTemporal=null;
    this.imagenSubir=null;

    this.s_modalupload.ocultarModal();
  }

}
