import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales : Hospital[]=[];
  totalHospitales : number = 0;
  cargando : boolean = true;
  desde : number = 0;


  constructor( public s_hospitales : HospitalService , public s_modalupload : ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    
    this.s_modalupload.notificacion.subscribe( resp =>{
      this.cargarHospitales();
    });
  }

  cargarHospitales(){
    this.cargando = true;

    this.s_hospitales.cargarHospitales(this.desde).subscribe( (resp:any) =>{
      console.log('carga');
      console.log(resp);
      this.hospitales = resp;
      this.cargando=false;
    });

  }

  buscarHospital(termino : string){

    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }

    this.cargando=true;
    
    this.s_hospitales.buscarHospital(termino).subscribe((hospital: Hospital[]) => {

      this.hospitales = hospital;
      this.cargando=false;
    });
    
  }

  modificarHospital(hospital:Hospital){

    this.s_hospitales.actualizarHospital(hospital).subscribe();

  }

  borrarHospital( hospital : Hospital){

    // if(hospital._id === this.s_hospitales.hospital._id){
    //   Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo' , 'error');
    //   return;
    // }
    Swal.fire({
      title:'¿Estas Seguro?',
      text:'Esta a punto de borrar a ' + hospital.nombre,
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then( borrar => {
      if(borrar){
        this.s_hospitales.borrarHospital(hospital._id).subscribe( resp => {
          console.log(resp);
          this.cargarHospitales();
        });
      }
    })
  }

  crearHospital(){

    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then( (valor) =>{

      if(!valor.value|| valor.value.length ===0){
        return;
      }

      this.s_hospitales.crearHospital(valor.value).subscribe( () => this.cargarHospitales());

    })
  }

  cambiarImagen(hospital : Hospital){
    this.s_modalupload.mostrarModal('hospitales', hospital._id);
  }

}
