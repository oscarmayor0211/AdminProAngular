import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo : File , tipo : string , id: string){

    return new Promise( (resolve, reject) => {

      let formdata = new FormData();
    let xhr = new XMLHttpRequest(); //peticion ajax

    formdata.append('imagen', archivo ,archivo.name);
    
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status ===200){
          console.log('Imagen subida');
          resolve(JSON.parse(xhr.response));
        }else{
          console.log('fallo la subida');
          reject(reject);
        }
      }
    };

    let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

    xhr.open('PUT',url , true);
    xhr.send( formdata);
    });

    
  }
}
