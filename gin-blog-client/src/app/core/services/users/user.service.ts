import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { User } from '../../models/users/user';
import { ApiService } from '../api.service';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  populate() {
    console.log('core-service-users-populate');
    if (this.jwtService.getToken()) {
      this.apiService.get('user/').subscribe(
        (data) => {
          this.setAuth(data.user);
        },
        (err) => {
          console.log('core-service-users-populate get user failed');
          this.purgeAuth();
        }
      );
    } else {
      console.log('core-service-users-populate get token failed');
      this.purgeAuth();
    }
  }

  checkAuth() {
    console.log(
      'core-service-users-checkAuth token',
      this.jwtService.getToken()
    );
    if (this.jwtService.getToken() === null) {
      console.log(
        'core-service-users-checkAuth currentUserSubject',
        this.currentUserSubject.value
      );
      if (this.currentUserSubject.value.username) {
        this.purgeAuth();
      }
    }
  }

  setAuth(user: User) {
    console.log('user', user);
    this.jwtService.saveToken(user.token || undefined);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    console.log('core-service-users-purgeAuth');
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  attempAuth(type, credentials): Observable<User> {
    const route = type === 'login' ? '/login' : '/';

    return this.apiService.post(`users${route}`, { user: credentials }).pipe(
      map((data: { user: User }) => {
        console.log('core-service-users-attempAuth response data', data);

        this.setAuth(data?.user);
        return data?.user;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update(user): Observable<User> {
    return this.apiService.put('user/', { user }).pipe(
      map((data) => {
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }
}
