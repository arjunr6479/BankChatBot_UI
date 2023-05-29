import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestDataSource } from '../model/restdatasource';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-complaint',
  templateUrl: './register-complaint.component.html',
  styleUrls: ['./register-complaint.component.css']
})
export class RegisterComplaintComponent {
  
  loginlogout=true;
  accntNumberVar=false;
  accntNumberValidCheckVar=false;

  constructor(private datasource:RestDataSource, private fb:FormBuilder,private router:Router) 
  { this.regForm = this.createFormGroup();
    if(sessionStorage.getItem("token")==null){
      this.loginlogout=true;
    }
    else{
      this.loginlogout=false;
    }
  }
  regForm:FormGroup;
  dateTime:Date = new Date();
  
  createFormGroup(){
    return this.fb.group({
      Name: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      AccntNumber: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      ComplaintDate: new FormControl(this.dateTime, [Validators.required]),
      Subject: new FormControl('', [Validators.required]),
      Complaint: new FormControl('', [Validators.required]),
    });
  }
  get f()  
  {
   return this.regForm.controls;
  }

  accountNoCheck(regForm:any){
    if(regForm.value.AccntNumber.toString().length==10){
      this.accntNumberVar=false;
      this.datasource.AccountNoCheck(regForm.value.AccntNumber.toString()).subscribe(response=>{  
        if(response.statusCode===404){
          this.accntNumberValidCheckVar=true;
          this.accntNumberVar=false;
        }
        else{
          this.accntNumberValidCheckVar=false;
          
        }
      })
    }
    else{
      this.accntNumberVar=true;
      this.accntNumberValidCheckVar=false;
    }
  }

registerComplaint(regForm:any){
  if(regForm.valid){
    this.datasource.AddComplain(this.regForm.value).subscribe(response=>{
      this.datasource.SetRefId(response.referenceId);
      Swal.fire( {
        icon:'success', 
        text: 'Your complaint has been successfully registered'})
      this.router.navigateByUrl("");
      this.datasource.InterComponentCallFun();
     });
  }
  else{
    Swal.fire( {
      icon:'error', 
      title:'Oops..',
      text: 'Please fill the required details'})
  }
}
  
  logout()
  {
    this.router.navigateByUrl("")
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('id'); 
  }
}
