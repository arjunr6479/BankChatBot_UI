import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, ConnectableObservable, of, Subject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Complain } from "./Complaint.model";
import { Fraud } from "./Fraud.model";

const PROTOCOL = "http";
const PORT = 8000;

@Injectable()
export class RestDataSource{
    auth_token?:string;
    baseUrl:string ;
    private interComponentCallFunSubject = new Subject<void>();
    refId!:string;  
    public places: Array<Location> = [];
    public abcd: Array<Location>=[];
    constructor(private http: HttpClient) {
      this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
      
    }

    InterComponentCallFun() {
      console.log("intercall")
      this.interComponentCallFunSubject.next();
    }
    GetInterComponentCallFunSubject() {
      console.log("intercall2")
      return this.interComponentCallFunSubject.asObservable();
    }

    authenticate(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.baseUrl+"api/Bank/LoginUser", {username,password} )
              .pipe(catchError((error) => {
                return error.message;
              }));        
      }
    
    AccountNoCheck(accntNo:string):Observable<any>{
      return this.http.get<any>(this.baseUrl+"api/Bank/accntNo?accntNo="+accntNo)
      .pipe(catchError((error) => {
        console.log(error)
        const errorArr=[{errorMsg:"Not Found"},{statusCode:404}]
        return errorArr;
      }));

    }
    
    GetUser():Observable<any>{
      return this.http.get<any>(this.baseUrl+"api/Bank/"+sessionStorage.getItem("id"))
      .pipe(catchError((error) => {
        
        return error.message;
      }));

    }

    AddComplain(complain:Complain):Observable<any>
    {
       
       return this.http.post<any>(this.baseUrl+"api/Bank/register-complain",complain).pipe(catchError((error)=>{
        return error.message;
       
       }));
    }
    ReportFraud(fraud:Fraud):Observable<any>
    {
       var token=sessionStorage.getItem("token");
       var httpHeaders=new HttpHeaders().set("Authorization","Bearer "+token)
       return this.http.post<any>(this.baseUrl+"api/Bank/report-fraud",fraud,{headers:httpHeaders})
       .pipe(catchError((error)=>{
        return error.message;
       
       }));
    }

    SetRefId(value:string){
      this.refId=value;
    }
    GetRefId():string{
      
      return this.refId;
    }

    getUserLocation(lat:number,lng:number):Observable<any>{
      console.log(lat,lng);
     return this.http.get<any>(this.baseUrl+"api/Bank/distance?startLongitude="+lng+"&startLatitude="+lat)
     .pipe(catchError((error)=>{
      return error.message;
     }));
     
  }
}