import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../model/user.model";
import { jwtDecode } from "jwt-decode";

@Injectable({providedIn: 'root'})
export class CurrentUserInfo{
    public currentUserInfoObs: Observable<User | null>;
    private currentUserInfoSubject: BehaviorSubject<User | null>;
    
    constructor()
    {
        this.currentUserInfoSubject = new BehaviorSubject<User|null>(null);
        this.currentUserInfoObs = this.currentUserInfoSubject.asObservable();
    }

    decodeToken(): any
    {
        let token = localStorage.getItem('sid');
        var isTokenValid = false;
        var payload = {};
        try{
            if(token)
            {
               var decodedtoken = jwtDecode(token);
               if(decodedtoken)
               {
                    payload = decodedtoken;
               }
               isTokenValid = true;
               console.log(decodedtoken);
            }

        }
        catch(e)
        {
            console.log(e);
        }
        return {isTokenValid: isTokenValid, payload};
    }

    storeInLocalStorage(token: string): void
    {
        localStorage.setItem('sid', token);
    }

    storeCurrentUserInfo(): void
    {
         if(localStorage.getItem('sid'))
        {
            const tokenDetail = this.decodeToken();
            if(tokenDetail.isTokenValid)
            {
                // this.storeTokenInStorage(token);
                const newUser = tokenDetail.payload;
                this.currentUserInfoSubject.next(newUser);

            }
            else
            {
                this.logout();
            }
        }
        else
        {
            this.logout();
        }
    }

    getRole(): string
    {
        let role = '';
         this.currentUserInfoObs
         .subscribe((user)=>{
            if(user)
            {
                role = user.role == 0? 'employee':'admin';
            }
         })
        return role;
    }

    logout(): void
    {
        this.clearCurrentUserInfo();
        this.clearStorage();
    }

    clearCurrentUserInfo(): void
    {
        this.currentUserInfoSubject.next(null);
    }

    clearStorage(): void
    {
       localStorage.removeItem('sid'); 
    }

    checkIfLoggedIn(): boolean
    {
        let isLoggedIn = false;
        if(localStorage.getItem('sid'))
        {
            const userDetails = this.decodeToken();
            if(userDetails.isTokenValid)
            {
                this.currentUserInfoObs.subscribe((user)=>
                {
                    console.log('user from obs', user);
                    console.log('user form storage', userDetails);
                    if(user != null && user.id === userDetails.payload.id)
                    {
                        isLoggedIn = true;
                    }
                })
            }
        }
        return isLoggedIn;
    }
}