import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from './auth.services';
import { catchError, throwError } from 'rxjs';
import { CurrentUserInfo } from '../../common/services/currentUserInfo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  signinForm!: FormGroup;
  serverError = '';

  constructor(private fb: FormBuilder,
    private _authService: AuthenticationService,
    private _userInfoService: CurrentUserInfo,
    private _router: Router

  )
  {
    this.signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

  ngOnInit():void
  {
     if(this._userInfoService.checkIfLoggedIn())
     {
        this.navigateToDashboard();
     }
  }

  navigateToDashboard():void
  {
    const role = this._userInfoService.getRole();
        console.log(role);
        if(role === 'admin')
        {
       
          this._router.navigate(['/dashboard']);
        }
        else
        { 
          console.log('here');
          this._router.navigate(['/employeeportal']);
        }
  }

  onSubmit(): void {
    this.serverError = '';
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
      this._authService.doLogin(this.signinForm.value)
      .pipe(
        catchError((err)=>{
          console.log(err);
          this.serverError = err.error.message;
          return throwError(() => err);
        })
      )
      .subscribe((data)=>{
        this._userInfoService.storeInLocalStorage(data.token);
        this._userInfoService.storeCurrentUserInfo();
        this.navigateToDashboard();
      });
    }
  }
}

