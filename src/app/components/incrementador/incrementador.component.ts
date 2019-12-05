import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

@ViewChild('txtprogress',{static: true}) txtprogress : ElementRef;


 @Input('nombre') leyenda : string = 'Leyenda';
 @Input() porcentaje: number =50;

 @Output() cambioValor : EventEmitter<number> = new EventEmitter();

 
  constructor() { }

  ngOnInit() {
  }

  onChange( newValue : number){

    // let elementHtml: any = document.getElementsByName('porcentaje')[0];
    // console.log(elementHtml.value);

    if( newValue >= 100){
        this.porcentaje =100;
    }else if( newValue <= 0 ){
      this.porcentaje=0;
    }else {
      this.porcentaje=newValue;

    }

    // elementHtml.value= Number(this.porcentaje);

    this.txtprogress.nativeElement.value= this.porcentaje;
    this.cambioValor.emit(this.porcentaje);

  }

  cambiarValor( valor : number){

    if(this.porcentaje >= 100 && valor > 0){
      this.porcentaje = 100;
      return;
    }
    if(this.porcentaje <= 0 && valor < 0){
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit(this.porcentaje);

    this.txtprogress.nativeElement.focus();
  }

}
