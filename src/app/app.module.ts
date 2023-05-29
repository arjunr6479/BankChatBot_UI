import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComplaintComponent } from './register-complaint/register-complaint.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ModelModule } from './model/model.module';
import { HttpClientModule } from '@angular/common/http';
import { ReportFraudComponent } from './report-fraud/report-fraud.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageComponent } from './manage/manage.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LandingPageComponent,
    RegisterComplaintComponent,
    LoginPageComponent,
    ReportFraudComponent,
    NavbarComponent,
    ManageComponent,
    
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModelModule,
    HttpClientModule,
     AgmCoreModule.forRoot({
       apiKey:environment.googleMapsKey
     }),
      
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
