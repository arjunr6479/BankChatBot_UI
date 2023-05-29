import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements DoCheck,AfterViewInit {
  loginlogout=true;
  mySubscription?:Subscription;
  constructor(private router:Router,private route: ActivatedRoute) { 

  if(sessionStorage.getItem("token")==null){
    this.loginlogout=true;
    // const decodedToken = sessionStorage.getItem("exp");
  }
  else{
    this.loginlogout=false;
  }
  }
  
  ngDoCheck(): void {
    if(sessionStorage.getItem("token")==null){
      this.loginlogout=true;
    }
    else{
      this.loginlogout=false;
    }
  }
  @ViewChild('features', { static: false }) featuresSec!: ElementRef;
  @ViewChild('home', { static: false }) homeSec!: ElementRef;
  @ViewChild('contact', { static: false }) contactSec!: ElementRef;



ngAfterViewInit() {
this.route.queryParamMap.subscribe(params => {
const section = params.get('section');
if (section==='features') {
const element = this.featuresSec.nativeElement;
element.scrollIntoView();
this.router.navigateByUrl("");
}
else if(section==='home'){
  const element = this.homeSec.nativeElement;
element.scrollIntoView();
this.router.navigateByUrl("");
}
else if(section==='contact'){
  const element = this.contactSec.nativeElement;
element.scrollIntoView();
this.router.navigateByUrl("");
}

});
}
  // @ViewChild('features') mySectionElement!: ElementRef;
  // ngAfterViewInit() {
  //   this.scrollToMyFragment();
  // }
  
  // scrollToMyFragment() {
  //   this.route.queryParams.subscribe(params=>{
  //      if(params['section']==='features'){
  //       setTimeout(()=>{
  //         this.mySectionElement.nativeElement.scrollIntoView();
  //       },0);
  //      }
  //   })
  // this.mySectionElement.nativeElement.scrollIntoView();
  // }
  
  logout()
  {
    this.loginlogout=true;
    this.router.navigateByUrl("")
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('id'); 
  }

}
