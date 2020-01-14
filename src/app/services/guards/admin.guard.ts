import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(public s_usuario : UsuarioService, public router : Router){}
  
  canActivate(){

    if(this.s_usuario.usuario.role === 'ADMIN_ROLE'){

      return true;
    }else{
      console.log('Bloqueado');
      // this.router.navigate(['/login']);

      this.s_usuario.logout();
      return false;
    }

    return true;
  }
  
}
