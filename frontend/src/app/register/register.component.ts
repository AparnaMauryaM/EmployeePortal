import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { captureError } from 'rxjs/internal/util/errorContext';
import { catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];
  
    signupForm!: FormGroup;
    
  
    constructor(private fb: FormBuilder,
                private _registerService: RegisterService,
                private _route: Router
    ) {
      this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      position: ['', Validators.required],
      department: ['', Validators.required]
    });
    }
  
    onSubmit() {
      if (this.signupForm.valid) {

        this._registerService.addEmployee(this.signupForm.value)
        .pipe(
          catchError((err)=>{
            console.log(err);
            return throwError(()=> err);
          })
        ).subscribe(result=>{
          console.log(result);
          this._route.navigate(['/login']);
        });
        
        
        console.log(this.signupForm.value);
      }
    }
}
