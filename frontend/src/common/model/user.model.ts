export interface User{
    id: string,
    role: number,
    username: string
}
export interface LoginResult{
  token: string,
  error: string,
  message: string
}

export interface Employee{
    EMPLOYEE_ID: string,
    NAME: string,
    EMAIL: string,
    USERNAME: string,
    POSITION: string,
    DEPARTMENT: string
}

export interface AdminDashboardData{
    error: number,
    message: string,
    employee: Employee[]
}

export interface UserDashboardData
{
    error: number,
    message: string,
    profile: Employee
}
