import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import * as sql from 'mssql';
import { Employee } from 'src/auth/dto/employee.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('SQL_CONNECTION') private readonly db: sql.ConnectionPool,
  ) {}

  /**
   * @function : createEmployee
   * @param dto
   * @description : Add employee details to DB
   * @returns : Promise<boolean>
   */
  async createEmployee(dto: RegisterDto): Promise<boolean> {
    try {
      const request = this.db.request();

      // Mapping DTO properties to SQL Parameters
      request.input('UserName', sql.VarChar, dto.username);
      request.input('Email', sql.VarChar, dto.email);
      request.input('Name', sql.VarChar, dto.name);
      request.input('Position', sql.VarChar, dto.position);
      request.input('Password', sql.VarChar, dto.password);
      request.input('department', sql.VarChar, dto.department);
      request.input('role', sql.Bit, 0);
      request.output('isDone', sql.Bit);
      request.output('ERROR_MESSAGE', sql.VarChar(sql.MAX));
      const result = await request.execute('ADDEMPLOYEEDETAILS');
      return result.output.isDone as boolean;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Some error occurred');
    }
  }

  /**
   * @function: getProfile
   * @param : empId
   * @returns : Promise<Employee[]>
   * @description : Fetch employee details
   */
  async getProfile(empId: number): Promise<Employee[]> {
    try {
      console.log(empId);
      const request = this.db.request();

      request.input('EMPID', sql.Int, empId);
      request.output('isDone', sql.Bit);
      request.output('ERROR_MESSAGE', sql.VarChar(sql.MAX));
      const result = await request.execute('GETEMPLOYEEDETAIL');
      console.log(result);
      if (result.output.isDone) {
        return result.recordset as Employee[];
      } else {
        throw new InternalServerErrorException('Some error occurred');
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Some error occurred');
    }
  }
}
