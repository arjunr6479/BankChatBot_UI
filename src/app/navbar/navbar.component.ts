import { Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BankUser } from '../model/BankUser.model';
import { RestDataSource } from '../model/restdatasource';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{
 user!:BankUser
  constructor(private router:Router,private datasource:RestDataSource){
    //this.router.navigateByUrl("landingpage");
    this.datasource.GetUser().subscribe(response=>{
    this.user=response;
    })
  }
  loginlogout=true;
  // @ViewChild('mySectionElement') mySectionElement!: ElementRef;

  // ngAfterViewInit() {
  // if (window.location.hash === '#features') {
  // this.scrollToMySection();
  // }
  // }
  
  // scrollToMySection() {
  // this.mySectionElement.nativeElement.scrollIntoView();
  // }

  ngDoCheck():void{
    if(sessionStorage.getItem("token")==null){
      this.loginlogout=true;
    }
    else{
      this.loginlogout=false;
    }
  }
  toggleMenu(){
    let subMenu = document.getElementById("subMenu");
    subMenu?.classList.toggle("open-menu");
  }
  logout()
  {
    this.loginlogout=true;
    this.router.navigateByUrl("")
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('id'); 
  }
  navigate(){
    this.router.navigateByUrl("");
  }
}
