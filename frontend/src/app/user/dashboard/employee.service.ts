import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee, UserDashboardData } from "../../../common/model/user.model";
import { environment } from "../../../environment/environment.development";

@Injectable({providedIn: 'root'})
export class EmployeeService{

    constructor(private _http: HttpClient)
    {}

    getProfile(): Observable<UserDashboardData>
    {
        return this._http.get<UserDashboardData>(`${environment.apiUrl}/user/getProfile`);
    }
}