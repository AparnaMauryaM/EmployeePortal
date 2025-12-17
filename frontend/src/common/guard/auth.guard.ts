import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CurrentUserInfo } from '../services/currentUserInfo.service';

export const authGuard: CanActivateFn = (route) => {
  const userInfoService = inject(CurrentUserInfo);
  const router = inject(Router);
 

  const isLoggedIn = userInfoService.checkIfLoggedIn();
  const role = userInfoService.getRole();
  const expectedRole = route.data?.['role'];

  console.log('role',role);
  console.log('isLoggedIn',isLoggedIn);

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  if (expectedRole && role !== expectedRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
