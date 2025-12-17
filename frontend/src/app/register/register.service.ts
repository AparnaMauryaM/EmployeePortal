import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment.development";

@Injectable({providedIn: 'root'})

export class RegisterService{

    constructor(private http : HttpClient)
    {

    }

    addEmployee(employeeDetail: any)
    {
        return this.http.post(`${environment.apiUrl}/register`, employeeDetail);
    }
}