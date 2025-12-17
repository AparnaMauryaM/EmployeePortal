import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboard } from './admin/dashboard.component';
import { authGuard } from '../common/guard/auth.guard';
import { UserDashboard } from './user/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "dashboard",
        component: AdminDashboard,
        canActivate: [authGuard],
        data: {role: 'admin'} 
    },
    {
        path: "employeeportal",
        component: UserDashboard,
        canActivate: [authGuard],
        data: {role: 'employee'}
    }
];
