import { Controller, Get, Request } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('dashboard')
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}
  @Get('/')
  getProfile(@Request() req) {
    const empId = req.user.role === 0 ? 0 : req.user.empId;
    return this.empService.getProfile(empId);
  }
}
