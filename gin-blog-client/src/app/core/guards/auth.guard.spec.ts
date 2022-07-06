import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../services/users/user.service';

import { AuthGuard } from './auth.guard';

const fakeRouterState = (url: string): RouterStateSnapshot => {
  return { url } as RouterStateSnapshot;
};

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let serviceStub: Partial<UserService>;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/', '/users', '/articles'];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    serviceStub = {};
    guard = new AuthGuard(routerSpy, serviceStub as UserService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe("user logged in", () => {
    beforeEach(() => {
      serviceStub.isAuthenticated = new Observable<boolean>
    })

    fakeUrls.forEach(fakeUrl => {
      it("navigate to guarded route", () => {
        const canActivate = of(guard.canActivate(dummyRoute, fakeRouterState(fakeUrl)))
        // console.log("canActivate", canActivate);
        canActivate.pipe(take(1)).subscribe((value) => {
          console.log("value", value);
        }, (error) => {
          console.error("error", error);          
        }, () => {
          console.log("complete");
        })
      })
    })
  })


});
