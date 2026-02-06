import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Employee } from '../dto/employee.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('JWT STRATEGY LOADED');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'MY_SECRET_KEY',
    });
  }

  validate(payload: Employee) {
    return {
      empId: payload.EMPLOYEE_ID,
      username: payload.USERNAME,
      role: payload.ROLE,
    };
  }
}
