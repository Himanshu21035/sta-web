// guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';

/**
 * Utility: Check authentication from persistent storage
 */
function isAuthenticated(): boolean {
  return !!sessionStorage.getItem('user');
}

/**
 * Utility: Get user role
 */
function getUserRole(): string | null {
  const userStr = sessionStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return user.role ?? null;
  } catch {
    return null;
  }
}
/**
 * Auth Guard
 * - Allows access only if user is authenticated
 * - Redirects unauthenticated users to /login
 */
export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);

  const auth = isAuthenticated();

//   console.log('🔒 authGuard');
//   console.log('URL:', state.url);
//   console.log('Authenticated:', auth);

  if (auth) {
    return true;
  }

   sessionStorage.setItem('redirectUrl', state.url);
  return router.createUrlTree(['/login']);
};

/**
 * Login Guard
 * - Prevents authenticated users from visiting /login
 */
export const loginGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);

  const auth = isAuthenticated();


  if (!auth) {
    return true;
  }

  return router.createUrlTree(['/admin']);
};

/**
 * Role Guard
 * - Allows access only if user has one of the allowed roles
 */
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (): boolean | UrlTree => {
    const router = inject(Router);

    const auth = isAuthenticated();
    const role = getUserRole();

    // console.log('👮 roleGuard');
    // console.log('Allowed roles:', allowedRoles);
    // console.log('User role:', role);

    if (!auth) {
      return router.createUrlTree(['/login']);
    }

    if (role && allowedRoles.includes(role)) {
      return true;
    }

    return router.createUrlTree(['/unauthorized']);
  };
};
