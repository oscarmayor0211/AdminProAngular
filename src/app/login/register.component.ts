import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare function init_plugin();

import Swal from 'sweetalert2'
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuarios.model';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma : FormGroup;

  constructor( public s_usuario : UsuarioService ,public router : Router) { }

  sonIguales(campo1:string , campo2:string){

    return (group : FormGroup)=>{

      let pass1  = group.controls[campo1].value;
      let pass2  = group.controls[campo2].value;

      if(pass1 === pass2){
        return  null;

      }else{
        return {
          sonIguales: true
        }
      }
      
    }

  }

  ngOnInit() {
  
    init_plugin();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, Validators.required),
      password2 : new FormControl(null, Validators.required),
      condiciones : new FormControl( false)
    }, { validators : this.sonIguales( 'password' , 'password2') });

  }

  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }
    if(!this.forma.value.condiciones){
      // console.log("debe de seleccionar las condiciones");
      Swal.fire(
        'Importante!',
        'Debe de seleccionar las condiciones!',
        'warning'
      )

      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this.s_usuario.crearUsuario(usuario).subscribe( resp => {
      console.log(resp);
      this.router.navigate(['/login']);
    });
  }

}
