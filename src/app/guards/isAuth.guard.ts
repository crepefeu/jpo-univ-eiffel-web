import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AdminsService } from '../services/admins.service';
import { Observable, map } from 'rxjs';

export function isAuth(): CanActivateFn {
  if (!localStorage.getItem('token')) {
    return (): boolean | UrlTree => {
      const router: Router = inject(Router);
      return router.createUrlTree(["/admin", "sign-in"]);
    };
  }

  return (isAuth): Observable<boolean | UrlTree> => {
    const adminService: AdminsService = inject(AdminsService);
    const router: Router = inject(Router);
    return adminService.verifyAuth().pipe(
      map((data: boolean) => {
        if (data) {
          return true;
        } else {
          return router.createUrlTree(["/admin", "sign-in"]);
        }
      })
    );
  };
}
