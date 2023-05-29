import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { RestDataSource } from "./restdatasource";
@NgModule({
    declarations:[],
    providers:[RestDataSource],
    imports:[
        HttpClientModule,
        CommonModule
    ]
})
export class ModelModule{}