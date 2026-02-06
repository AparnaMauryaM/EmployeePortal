import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from 'src/employee/employee.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as sql from 'mssql';
import { Employee } from './dto/employee.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: EmployeeService,
    @Inject('SQL_CONNECTION') private readonly db: sql.ConnectionPool,
    private jwtService: JwtService,
  ) {}

  /**
   * @function : addEmployee
   * @param: registerDto
   * @descrition : Add new employee details in DB
   * @returns : Promise<string>
   */
  async addEmployee(dto: RegisterDto): Promise<string> {
    await this.usersService.createEmployee(dto);

    return 'Registration successful. Please login.';
  }

  /**
   * @function : isDefaultAdmin
   * @param :  username
   * @param : password
   * @description: Checks whether the provided credentials belong to the default admin user.
   * @returns : boolean
   */

  isDefaultAdmin(username: string, password: string): boolean {
    try {
      if (username == 'admin') {
        if (password != 'Mindfire1') {
          throw new UnauthorizedException('Invalid username or password');
        } else {
          return true;
        }
      }
      return false;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Unable to process login request');
    }
  }

  /**
   * @function: doLogin
   * @param : dto
   * @returns : Promise<object>
   * @description : Return token after checking usernam and password
   */
  async doLogin(dto: LoginDto): Promise<object> {
    try {
      let payload: Employee;
      const isAdmin = this.isDefaultAdmin(dto.username, dto.password);
      if (isAdmin) {
        payload = {
          USERNAME: 'admin',
          ROLE: true,
          DEPARTMENT: '',
          POSITION: '',
          EMPLOYEE_ID: 0,
        };
      } else {
        const empDetail = await this.checkLoginDetails(
          dto.username,
          dto.password,
        );
        payload = empDetail;
      }

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Unable to process login request');
    }
  }

  /**
   * @function : checkLoginCredentials
   * @param : username
   * @param : password
   * @description : check employee credentials from DB.
   * @returns Promise<Employee>
   */
  async checkLoginDetails(
    username: string,
    password: string,
  ): Promise<Employee> {
    try {
      const request = this.db.request();

      // Mapping DTO properties to SQL Parameters
      request.input('UserName', sql.VarChar, username);
      request.input('Password', sql.VarChar, password);

      request.output('isDone', sql.Bit);
      request.output('ERROR_MESSAGE', sql.VarChar(sql.MAX));
      const result = await request.execute('CHECKLOGINDETAILS');
      console.log(result);
      if (result.output.isDone) {
        if (result.recordset[0]) {
          return result.recordset[0] as Employee;
        } else {
          throw new UnauthorizedException('Invalid username or password');
        }
      } else {
        throw new InternalServerErrorException(
          'Unable to process login request',
        );
      }
    } catch (error) {
      console.log(error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Unable to process login request');
    }
  }
}
