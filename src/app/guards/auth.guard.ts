import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
var token:any=null;
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    token=sessionStorage.getItem("token")
    if(token==null){
      Swal.fire({
        icon:'warning',
        text:'Sorry! Not Authorized',


      }).then((result)=>{
        this.router.navigateByUrl("")
      })
      return false;
    }
    //this.router.navigateByUrl("")
    return true;
  }
  
}
