import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ProfileService } from '../../core/services/users/profile.service';
import { Profile } from '../../core/models/users/profile';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolverService implements Resolve<Profile> {
  constructor(private profileService: ProfileService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Profile | Observable<Profile> | Promise<Profile> | Observable<any> {
    return this.profileService
      .get(route.params['username'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
