// SetMetadata is used to attach custom metadata to route handlers or controllers
import { SetMetadata } from '@nestjs/common';

/**
 * IS_PUBLIC_KEY
 *
 * Unique metadata key used to identify public routes.
 * This key is checked inside the JWT authentication guard
 * to determine whether authentication should be skipped.
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Public
 *
 * Custom decorator to mark a route or controller as public.
 *
 * When applied, the JWT authentication guard will:
 * - Detect this metadata using Reflector
 * - Skip JWT validation for the decorated route
 *
 * Usage:
 * @Public()
 * @Get('login')
 * login() {}
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
