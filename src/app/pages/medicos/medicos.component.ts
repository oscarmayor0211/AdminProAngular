import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos : Medico[]=[];
  constructor(public s_medico : MedicoService) { }

  ngOnInit() {
    this.cargarMedico();
  }

  cargarMedico(){
    this.s_medico.cargarMedicos().subscribe( resp => this.medicos = resp);
  }

  buscarMedico(termino : string){
    
    if(termino.length <= 0){
      this.s_medico.cargarMedicos();
      return;
    }
    this.s_medico.buscarUsuario(termino).subscribe((resp:any) => this.medicos = resp
    );
  }

  eliminarMedico(medico : Medico){

     this.s_medico.eliminarMedico(medico._id).subscribe( () => this.cargarMedico());

  }
}
