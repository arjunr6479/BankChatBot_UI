import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import * as jsonData from '../../assets/FAQ.json';
import { BankUser } from '../model/BankUser.model';
import { RestDataSource } from '../model/restdatasource';
//////////////////////////////////////////////



export interface Message {
  type: string;
  message: {
    reply:any,
    url?:any,
    url1?:any,
    url2?:any
  }
  
}



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  
})
export class ChatComponent implements OnDestroy{
  currentDate:Date=new Date();
  formattedCurrentDate!:any;
  numberOfDays!:number;
  lat!:number;
  lng!:number;
  layer: any;
  public locationList: Array<any>=[]; 
  private subscription: Subscription;
  locatorVar=false;
  textbox=true;
  reminder=true;
  loginlogout=true;
  data: any = jsonData;
  isOpen = false;
  loading = false;
  urlButtonVar=true;
  messages: Message[] = [];
  user=new BankUser();
  dataKeys:any[]=Object.keys(this.data);  
  img:string="../../assets/chatbot.png";
  refId!:string;
  url!:string;
  username!:string
  welcomeText1:string='Hey! I am Nia, please select any of the options below or type in the chatbox.'
  welcomeText2:string='Hi '+this.username+'I am Nia, please select any of the options below or type in the chatbox.'
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(private router:Router, private datasource:RestDataSource,private datePipe:DatePipe) {
    this.subscription = this.datasource.GetInterComponentCallFunSubject().subscribe(() => {
      this.InterComponentFun();
    });
    if(sessionStorage.getItem("token")==null){
      this.messages.push({
        type: 'client',
        message: {
          reply:'Hey! I am Nia, please select any of the options below or type in the chatbox.',
        }
      }); 
    }
    else{
      this.datasource.GetUser().subscribe(response=>{
        this.username=response.name;
        this.messages.push({
          type: 'client',
          message: {
            reply:'Hi '+response.name+', I am Nia, please select any of the options below or type in the chatbox.',
          }
        }); 
      })
    }
        
  }
  
  
  BackToHome(){
    this.messages.splice(1);
    this.chatForm.reset();
    this.urlButtonVar=true;
    this.locatorVar=false;
    if(sessionStorage.getItem("token")==null){
      this.messages.splice(0);
      this.messages.push({
        type: 'client',
        message: {
          reply:'Hey! I am Nia, please select any of the options below or type in the chatbox.',
        }
      }); 
      this.loginlogout=true;
    }
    else{
      this.messages.splice(0);
      this.datasource.GetUser().subscribe(response=>{
        this.username=response.name;
        this.messages.push({
          type: 'client',
          message: {
            reply:'Hi '+response.name+', I am Nia, please select any of the options below or type in the chatbox.',
          }
        }); 
      })
      this.loginlogout=false;
    }
  }
 
  openSupportPopup() {
    this.isOpen = !this.isOpen;
    this.messages.splice(1);
    this.chatForm.reset();
    this.locatorVar=false;
    this.urlButtonVar=true;
    if(sessionStorage.getItem("token")==null){
      this.loginlogout=true;
      this.messages.splice(0);
      this.messages.push({
        type: 'client',
        message: {
          reply:'Hey! I am Nia, please select any of the options below or type in the chatbox.',
        }
      }); 
    }
    else{
      this.loginlogout=false;
      this.messages.splice(0);
      this.datasource.GetUser().subscribe(response=>{
        this.username=response.name;
        this.messages.push({
          type: 'client',
          message: {
            reply:'Hi '+response.name+', I am Nia, please select any of the options below or type in the chatbox.',
          }
        }); 
      })
    }
  }
   urlButton(url:any){
    this.url=url;
    if(url=="Register"){
      this.router.navigateByUrl("register-complaint");
      this.isOpen = !this.isOpen;
    // this.messages.splice(1);
    this.chatForm.reset();
    }
    else if (url=="Login"){
      this.router.navigateByUrl("login");
      this.isOpen = !this.isOpen;
    // this.messages.splice(1);
    // this.chatForm.reset();
    }
    else if (url=="Logout"){
      this.loginlogout=true;
      this.messages.push({
        type: 'user',
        message: {
          reply:'Logout',
        }
      });
      this.urlButtonVar=false;
      this.messages.push({
        type: 'client',
        message: {
          reply:'Hey! You have successfully logged out.',
        }
      });
      this.scrollToBottom();
      this.logout();
    }
    else if(url=="report-fraud"){
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Report Fraud',
          }
      }); 
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
        this.isOpen = !this.isOpen;
        this.router.navigateByUrl("report-fraud");
      }
    this.scrollToBottom();
    this.urlButtonVar=false;
    }
    else if(url=="Credit Card"){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Credit Card',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["Credit Card related issues"],
      });
      this.urlButtonVar=false;
      this.scrollToBottom();
    }
    else if(url=="Debit Card"){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Debit Card',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["Debit Card related issues"],
      });
      this.urlButtonVar=false;
      this.scrollToBottom();
    }
    else if(url=="Loan"){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Loan',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["How to apply for home loan?"],
      });
      this.urlButtonVar=false;
      this.scrollToBottom();
    }
    else if(url=='Send location'){
      console.log("hi");
      this.loading = true;
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
          var lat=position.coords.latitude;
          var lng=position.coords.longitude;
          console.log(lat,lng);
          this.lat=lat;
          this.lng=lng;
          this.datasource.getUserLocation(lat,lng).subscribe(response=>{
          console.log(response);
          this.loading=false;
          
        //  response.sort( (a:any, b:any) =>{
        //     if (a.distance > b.distance) {return 1;}
        //     if (a.distance < b.distance){ return -1;}
        //  return 0;
        //  });
        

        
        ////////////////////////////////////////   
        // this.source = new Vector();
        // const osmLayer = new TileLayer({
        //   source: new OSM(),
        //   });
        // this.map = new Map({
        //   target: 'map',
        //   layers:[osmLayer],
        //   view: new View({
        //     // projection:'EPSG:4326',
        //     center: fromLonLat([lng, lat]),
        //     zoom: 8
        //   })
        // });
        // this.layer = new VectorLayer({
        //   source: this.source,
        //   style: new Style({
        //     stroke: new Stroke({
        //       width: 3,
        //       color: [200,0, 0]
        //     })
        //   })
        // });
        // this.map.addLayer(this.layer);
        // for(let i=0;i<response.length;i++){
        //   const route = new LineString(response[i].geometry.coordinates);
  
        //   const routeFeature = new Feature({
        //     type: 'path',
        //     geometry: route,
        //     dataProjection:'EPSG:4326',
        //     featureProjection: 'EPSG:3857'
        //     });
        //   this.source.addFeature(routeFeature);
        //   this.map.getView().fit(this.source.getExtent(), {
        //     padding: [50, 50, 50, 50],
        //   });
        //   this.locationList.push()
        

        // }
    
      


        this.locationList=response;
        this.locatorVar=true;
          })
    });
  } 

    } 
    else if(url=='Locator'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Locate ATM/Bank',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["Locate nearest ATM/Branch"],
      });

      this.urlButtonVar=false;
      this.scrollToBottom();
    }
    else if(url=='Check Notifications'){
      this.formattedCurrentDate=this.datePipe.transform(this.currentDate, 'EEEE, MMMM d, y');
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Check notifications',
          }
      });
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
      this.datasource.GetUser().subscribe(response=>{
        this.messages.push({
          type: 'user',
          message: {
            reply:'Check Notifications',
          }
      });
      var notificationArray:Array<any>=[];
      var mssg:string="";
       if(response.creditCardPayment==true){
          const creditCardDueDate = this.datePipe.transform(response.creditDueDate, 'EEEE, MMMM d, y');
          const timeDiff = Math.abs(new Date(creditCardDueDate!).getTime() - new Date(this.formattedCurrentDate).getTime());
          this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          notificationArray.push("Your Credit Card bill payment is due by "+creditCardDueDate+". Which is "+this.numberOfDays+" day(s) from now. Thankyou")
        }
        if(response.loanPayment==true){
          const loanDueDate = this.datePipe.transform(response.loanDueDate, 'EEEE, MMMM d, y');
          const timeDiff = Math.abs(new Date(loanDueDate!).getTime() - new Date(this.formattedCurrentDate).getTime());
          this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          notificationArray.push("Your Loan Installment is due by "+loanDueDate+". Which is "+this.numberOfDays+" day(s) from now. Thankyou")
        }
        if(response.balance<2000)
        {
          notificationArray.push("Your Balance is low. Please maintain an amount of atleast 2000 Ruppees")
        }
       if(notificationArray.length==0)
       {
        notificationArray.push("No important notifications")
       }
 
      for(let i=0;i<notificationArray.length;i++)
      {
        mssg=mssg+">> "+notificationArray[i]+"\n"
        if(i==notificationArray.length-1)
        {
          this.messages.push({
            type: 'client',
            message: {
              reply:mssg
            }
        });
 
        }
      }

      });
    }
        this.urlButtonVar=false;
        this.scrollToBottom();
    }
    else if (url==='Click here'){
      this.isOpen = !this.isOpen;
      this.router.navigateByUrl("manage");
    }
    else if(url=="Manage Credit Card"){
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Manage Credit Card',
          }
      }); 
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
        this.isOpen = !this.isOpen;
        this.router.navigateByUrl("manage");
      }
    this.scrollToBottom();
    this.urlButtonVar=false;
    }
    else if(url=="Block Credit Card"){
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Block Credit Card',
          }
      }); 
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
        this.isOpen = !this.isOpen;
        this.router.navigateByUrl("manage");
      }
    this.scrollToBottom();
    this.urlButtonVar=false;
    }
    else if(url=="Bill Payment"){
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Bill Payment',
          }
      }); 
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
        this.isOpen = !this.isOpen;
        this.router.navigateByUrl("manage");
      }
    this.scrollToBottom();
    this.urlButtonVar=false;
    }
    else if(url=="Manage Debit Card"){
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Manage Debit Card',
          }
      }); 
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
        this.isOpen = !this.isOpen;
        this.router.navigateByUrl("manage");
      }
    this.scrollToBottom();
    this.urlButtonVar=false;
    }
    else if(url=="Block Debit Card"){
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Block Debit Card',
          }
      }); 
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
        this.isOpen = !this.isOpen;
        this.router.navigateByUrl("manage");
      }
    this.scrollToBottom();
    this.urlButtonVar=false;
    }
    else if(url=="Update Debit Card"){
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Update Debit Card',
          }
      }); 
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
        this.isOpen = !this.isOpen;
        this.router.navigateByUrl("manage");
      }
    this.scrollToBottom();
    this.urlButtonVar=false;
    } 
    else if(this.url=='Balance'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Check Balance',
        }
    }); 
    // this.refId=this.datasource.GetRefId();
    this.datasource.GetUser().subscribe(response=>{
      this.user=response;
      this.messages.push({
        type: 'client',
        message: {
          reply:'Your current balance is '+response.balance+' Ruppees',
          
        }
      });
      
    })
      //   this.messages.push({
      //    type: 'client',
      //    message: {
      //      reply:'Hi'+this.user.name+'logged in successfully.',
      //    }
      //  });
       this.urlButtonVar=false;
       this.scrollToBottom();
    }
  }
  getDirectons(endlat:number,endlng:number){
    console.log(endlat,endlng,this.lat,this.lng)
    var url = 'https://www.google.com/maps/dir/?api=1&origin='+this.lat+','+this.lng+'&destination='+endlat+','+endlng
    window.open(url,'_blank')
  }
  logout()
  {
    this.router.navigateByUrl("");
    sessionStorage.removeItem("refId");
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('id'); 
  }
  sendMessage() {
    const sentMessage = this.chatForm.value.message!;
    this.loading = true;
    this.messages.push({
      type: 'user',
      message:{
        reply:sentMessage,
      } 
    });
    this.chatForm.reset();
    this.scrollToBottom();
    
    this.loading = false;
    if(this.dataKeys.includes(sentMessage)){
    this.messages.push({
          type: 'client',
          message: this.data[sentMessage],
        });
      this.scrollToBottom();
    }
    else{
      this.messages.push({
        type: 'client',
        message: {
          reply:"Sorry! could not process request, Kindly choose from the suggestions.",
        }
      });
    }
    this.urlButtonVar=false;
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 500;
      } catch (err) {}
    }, 150);
  }

  reminderFun(){
    this.urlButtonVar=!this.urlButtonVar;
    this.textbox=!this.textbox;
    this.reminder = !this.reminder;
    this.locatorVar=false;
  }

  InterComponentFun(){
    this.isOpen = !this.isOpen;
    if(this.url=='report-fraud'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Report fraud',
        }
    }); 
    this.refId=this.datasource.GetRefId();
        this.messages.push({
         type: 'client',
         message: {
           reply:'Your report has been registered successfully with reference ID: '+this.refId,
           
         }
       });
       this.urlButtonVar=false;
       this.scrollToBottom();
    }
    else if(this.url=='Login'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Login',
        }
    }); 
    // this.refId=this.datasource.GetRefId();
    this.datasource.GetUser().subscribe(response=>{
      this.user=response;
    })
        this.messages.push({
         type: 'client',
         message: {
           reply:'Hi'+this.user.name+'logged in successfully.',
         }
       });
       this.urlButtonVar=false;
       this.scrollToBottom();
    }
    else if(this.url=='Register'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Register a complaint',
        }
    }); 
    this.refId=this.datasource.GetRefId();
    
        this.messages.push({
         type: 'client',
         message: {
           reply:'Your complaint has been registered successfully with reference ID: '+this.refId,
         }
       });
       this.urlButtonVar=false;
       this.scrollToBottom();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

