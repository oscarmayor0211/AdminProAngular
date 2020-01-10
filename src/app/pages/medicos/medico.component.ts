import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales : Hospital[]=[];

  medico : Medico = new Medico('','','','','');
  hospital : Hospital = new Hospital('');
  constructor( public s_hospital: HospitalService , public s_medico : MedicoService , public router : Router , public activatedRoute : ActivatedRoute, public s_modalUpload : ModalUploadService) { 

    activatedRoute.params.subscribe( params => {
      let id = params['id']; // el 'id' sale del parametro que le colocamos a la ruta en los pagesroutes

      if(id !== 'nuevo'){
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.s_hospital.cargarHospitales().subscribe( hospital => this.hospitales = hospital);

    this.s_modalUpload.notificacion.subscribe(resp =>{

      this.medico.img = resp.medico.img;
        console.log(resp);
    });
  }

  cargarMedico(id: string){

    this.s_medico.cargarMedico(id).subscribe( (resp:any) => {
      this.medico = resp;
      this.medico.hospital = resp.hospital._id;

      this.cambioHospital(this.medico.hospital);
    });

  }

  guardarMedico( f : NgForm){

    console.log(f.valid);
    console.log(f.value);
    
    if(f.invalid){
      return;
    }

    this.s_medico.guardarMedico( this.medico).subscribe(resp=>{
      this.medico._id = resp._id;
      this.router.navigate(['/medico', resp._id]);
    })

  }

  cambioHospital(id :string){

    this.s_hospital.obtenerHospital(id).subscribe( (resp:any) => {
      console.log(resp);

      this.hospital = resp;
    })
  }

  cambiarFoto(){
    this.s_modalUpload.mostrarModal('medicos',this.medico._id);
  }

}
