// ExecutionContext provides details about the current request
import { ExecutionContext, Injectable } from '@nestjs/common';

// Reflector is used to read metadata set by decorators
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/publicRoutes.decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    /**
     * Check if the current route or controller
     * has been marked as public using the @Public() decorator.
     *
     * getAllAndOverride checks metadata in the following order:
     * 1. Method (handler) level
     * 2. Controller (class) level
     */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    /**
     * If the route is public:
     * - Skip JWT authentication completely
     * - Allow the request without validating a token
     */

    if (isPublic) {
      return true; // skip auth for routes containing @public decorator
    }

    /**
     * If the route is not public:
     * - Delegate authentication to Passport's JWT strategy
     */

    return super.canActivate(context); // 🔐 normal JWT auth
  }
}
