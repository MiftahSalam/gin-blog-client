import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
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
    if (this.jwtService.getToken()) {
      this.apiService.get('users').subscribe(
        (data) => {
          this.setAuth(data.user);
        },
        (err) => {
          this.purgeAuth();
        }
      );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    console.log('user', user);
    this.jwtService.saveToken(user?.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  attempAuth(type, credentials): Observable<User> {
    const route = type === 'login' ? '/login' : '';

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
    return this.apiService.put('users', { user }).pipe(
      map((data) => {
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }
}
