import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public s_settings : SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema : string, link : any ) {
    console.log(tema);

    this.aplicarCheck(link);

    this.s_settings.aplicarTema(tema);

  }

  aplicarCheck( link :any){

    let selectores: any = document.getElementsByClassName('selector');

    for(let ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck(){

    let selectores: any = document.getElementsByClassName('selector');

    let tema = this.s_settings.ajustes.tema;
    for(let ref of selectores){

      if(ref.getAttribute('data-theme') === tema){
        ref.classList.add('working');
        break;
      }
    }

  
  }
}
