import { Injectable } from '@nestjs/common';

// PassportStrategy integrates Passport strategies into NestJS
import { PassportStrategy } from '@nestjs/passport';

// ExtractJwt is used to extract the JWT from incoming requests
// Strategy is the JWT strategy provided by passport-jwt
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Employee } from '../dto/employee.dto';

/**
 * JwtStrategy
 *
 * This strategy is responsible for:
 * - Extracting the JWT from the Authorization header
 * - Verifying the token using a secret key
 * - Validating and transforming the decoded payload
 *
 * Once validated, the returned object is attached to request.user
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'MY_SECRET_KEY',
    });
  }

  /**
   * validate
   *
   * This method is automatically called after the JWT is successfully verified.
   *
   * @param payload - Decoded JWT payload
   * @returns An object containing the authenticated user's details
   *
   * The returned object will be attached to request.user
   * and will be available in controllers and guards.
   */

  validate(payload: Employee) {
    return {
      empId: payload.EMPLOYEE_ID,
      username: payload.USERNAME,
      role: payload.ROLE,
    };
  }
}
