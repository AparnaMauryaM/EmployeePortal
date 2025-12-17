import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment.development";
import { Observable } from "rxjs";
import { LoginResult } from "../../common/model/user.model";

@Injectable({providedIn: 'root'})
export class AuthenticationService
{
    constructor(private _http: HttpClient)
    {

    }

    doLogin(loginData:{username: string, password: string}): Observable<LoginResult>
    {
        return this._http.post<LoginResult>(`${environment.apiUrl}/login`,loginData);
    }

    



}