import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../../core/services/users/user.service';

@Injectable({
  providedIn: 'root',
})
export class HomeAuthResolverService implements Resolve<boolean> {
  constructor(private router: Router, private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
