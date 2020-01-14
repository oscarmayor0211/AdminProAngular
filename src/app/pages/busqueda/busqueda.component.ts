import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {


  hospital : Hospital[]=[];
  medico : Medico[]=[];
  usuario : Usuario[]=[];



  constructor(public activatedRoute : ActivatedRoute , public http : HttpClient) {
    activatedRoute.params.subscribe( params => {
      let termino =params['termino'];

      this.buscar(termino);
    });
   }

  ngOnInit() {
  }

  buscar(termino : string){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe( (resp:any) => {
      console.log(resp);
      this.hospital = resp.hospitales;
      this.medico = resp.medicos;
      this.usuario= resp.usuario;
    });
  }
}
