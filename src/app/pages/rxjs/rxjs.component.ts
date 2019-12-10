import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit , OnDestroy {

  subscription : Subscription;


  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe( 
      numero => console.log('subs' , numero),
      error => console.log('error',error),
      () => console.log('termino')

     )
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log(' la pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable():Observable<any>{

   return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor : contador  
        }
        observer.next( salida );

        // if( contador === 3) {
        //   clearInterval(intervalo)
        //   observer.complete();
        // }

        // if( contador === 2) {
        //   // clearInterval(intervalo)
        //   observer.error('auxilio');
        // }
      },1000);
    }).pipe(map(resp => resp.valor),
            filter( (valor , index) => {

              if( valor % 2 === 1){
                //numero impar
                 return true;
              }else{
                //numero par
                return false;
              }
            })
    )

    // return obs;
  }

}
