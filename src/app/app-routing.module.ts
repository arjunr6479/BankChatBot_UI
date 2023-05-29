import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
// import { ChatComponent } from './chat/chat.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManageComponent } from './manage/manage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComplaintComponent } from './register-complaint/register-complaint.component';
import { ReportFraudComponent } from './report-fraud/report-fraud.component';

const routes: Routes = [
   {path:"login",component:LoginPageComponent},
   
   {path:"",component:NavbarComponent,

   children:[
    {path:"",component:LandingPageComponent},
    
    {path:"manage",component:ManageComponent,canActivate:[AuthGuard]},
    {path:"register-complaint",component:RegisterComplaintComponent},
    {path:"report-fraud",component:ReportFraudComponent,canActivate:[AuthGuard]},
   ]
  }
//   {path:"",component:NavbarComponent,
   
//   children:[
//    {path:"",component:ChatComponent,
//   children:[
//     {path:"",component:LandingPageComponent},
//    {path:"manage",component:ManageComponent,canActivate:[AuthGuard]},
//    {path:"register-complaint",component:RegisterComplaintComponent},
//    {path:"report-fraud",component:ReportFraudComponent,canActivate:[AuthGuard]},
//   ]
//   }
//   ]
//  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
