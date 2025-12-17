import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment.development";
import { Observable } from "rxjs";
import { AdminDashboardData, Employee } from "../../common/model/user.model";

@Injectable({providedIn: 'root'})
export class AdminDashboardService{

    constructor(private _http: HttpClient)
    {

    }

    fetchDashboardDetails(): Observable<AdminDashboardData>
    {
        return this._http.get<AdminDashboardData>(`${environment.apiUrl}/admin/getAllEmployees`);
    }
}