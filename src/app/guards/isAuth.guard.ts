import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AdminsService } from '../services/admins.service';
import { Observable, map, of } from 'rxjs';

export function isAuth(): CanActivateFn {

  return (isAuth): Observable<boolean | UrlTree> => {
    const adminService: AdminsService = inject(AdminsService);
    const router: Router = inject(Router);
    if (!localStorage.getItem('token')) {
      return of(router.createUrlTree(["/admin", "sign-in"]));
    } else {
      return adminService.verifyAuth().pipe(
        map((data: any) => {
          if (data && data.isAuthenticated == true) {
            return true;
          } else {
            return router.createUrlTree(["/admin", "sign-in"]);
          }
        })
      );
    }
  };
}
