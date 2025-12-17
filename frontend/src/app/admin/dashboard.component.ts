import { Component } from '@angular/core';
import { Employee } from '../../common/model/user.model';
import { AdminDashboardService } from './dashboard.service';
import { CurrentUserInfo } from '../../common/services/currentUserInfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdminDashboard {

    employeeList: Employee[] = [];

    constructor(private _adminDashboardService: AdminDashboardService,
        private _userInfoService: CurrentUserInfo,
        private _router: Router
    )
    {

    }

    ngOnInit():void{
        this._adminDashboardService.fetchDashboardDetails()
        .subscribe((data) => {
            console.log(data);
           this.employeeList = data.employee;
           console.log(this.employeeList);
        });
    }

    logout(): void{
        this._userInfoService.logout();
        this._router.navigateByUrl('login');

    }
}

