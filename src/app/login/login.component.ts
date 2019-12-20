import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuarios.model';


declare function init_plugin();
declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email :string;
  recuerdame : boolean =false;

  auth2 :any;

  constructor( public router : Router ,public s_usuario : UsuarioService) { }

  ngOnInit() {
    init_plugin();
    this.googleInit();

    this.email= localStorage.getItem('email') || '';

    if(this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit(){
    
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '825398918288-8uflhku1edtmgj861dc3enh8l7nrrils.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingnin(document.getElementById('btnGoogle'));
    });

  }


  attachSingnin( element ){

    this.auth2.attachClickHandler(element , {}, (googleUser) =>{
        // let profile = googleUser.getBasicProfile();

        let token =  googleUser.getAuthResponse().id_token;

        this.s_usuario.loginGoogle(token).subscribe( () => window.location.href = '#/dashboard');

    });
  }

  ingresar( forma : NgForm){

    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null,forma.value.email, forma.value.password);
    
    this.s_usuario.login(usuario, forma.value.recuerdame).subscribe( resp => this.router.navigate(['/dashboard']));

    // this.router.navigate(['/dashboard']);
  }

 
}
