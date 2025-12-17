import { Component } from '@angular/core';
import { Employee } from '../../../common/model/user.model';
import { EmployeeService } from './employee.service';
import { CurrentUserInfo } from '../../../common/services/currentUserInfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class UserDashboard {

    employee!: Employee;
    constructor(private _employeeService: EmployeeService,
        private _userInfoService: CurrentUserInfo,
        private _router: Router
    )
    {}

    ngOnInit(): void{
        this._employeeService.getProfile()
        .subscribe((data)=>{
            this.employee = data.profile;
        })
    }

    logout(): void{
        this._userInfoService.logout();
        this._router.navigateByUrl('login');
    }
}