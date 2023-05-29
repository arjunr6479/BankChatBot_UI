import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestDataSource } from '../model/restdatasource';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {



  // title=""
  submit=false;
  


  visible:boolean = true;
  changetype:boolean = true;
 // isAuthenticate:boolean=false;

  // viewpass(){
  //   this.visible = !this.visible;
  //   this.changetype = !this.changetype;
  // }

  public username: any;
  public password: any;
  public Password: any;
  public token?: any;
 public id?:any;
  public errorMessage?: string;
  public Eid?: number;
  
  loginlogout=true;

  constructor(private router: Router, private datasource: RestDataSource,private fb:FormBuilder) { }


  loginForm=this.fb.group({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
  })

  get f(){
    return this.loginForm.controls;
   }

  //  onsubmit(){
  //   this.submit=true;
  //   console.log();
  //  }
   

  show = true;

  ngOnInit() {
    this.password = 'password';
  }

  onClickEye() {
    if (this.password === 'password') {
      console.log("Hii");
      this.password = 'text';
      this.show = false;
    } else {
      console.log("Hello");
      this.password = 'password';
      this.show = true;
    }
    // this.show=true;

  }
  // }
  // onClickEye(){
  //   this.show = true;
  // }

  
  authenticate() {
this.username=this.loginForm.controls.username.value;
this.Password=this.loginForm.controls.password.value;
  
    

    this.datasource.authenticate(this.username , this.Password)
        .subscribe(response => {       
          this.token = response.token;
          this.id=response.userId;
          this.datasource.InterComponentCallFun();
          // console.log(response);
          // console.log(this.id);
          if(this.token != null){
            sessionStorage.setItem("token", this.token);
            sessionStorage.setItem("id", this.id);
            
            this.router.navigateByUrl("");
            
            
            setTimeout(()=>{
              this.logout();
            },3600000);
          }
          else {
            this.errorMessage = "Unauthorized Access!!";
            //this.isAuthenticate=false;
            
          }
          
        });
  }
  logout(){
    this.loginlogout=true;
    this.router.navigateByUrl("")
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('id'); 
    Swal.fire( {
      icon:'error', 
      title:'Oops..',
      text: 'Your session is expired, Please Login again'})
  }
  

}
