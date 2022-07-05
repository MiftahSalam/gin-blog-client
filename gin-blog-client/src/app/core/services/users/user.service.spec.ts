import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../../models/users/user';
import { environment } from 'src/environments/environment';

const mockUser: User = {
  username: 'miftah',
  bio: 'bio',
  email: 'miftah@gmail.com',
  image: 'http://image.png',
  token: 'asdr3fdsdf',
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('purgeAuth', () => {
    it('clear auth', () => {
      service.purgeAuth();
      service.currentUser.subscribe((user) => {
        expect(user).toEqual({} as User);
      });
      service.isAuthenticated.subscribe((auth) => {
        expect(auth).toBeFalse();
      });
    });
  });

  describe('setAuth', () => {
    it('should set auth', () => {
      service.setAuth(mockUser);

      const savedUser = window.localStorage.jwtToken;
      expect(savedUser).toEqual(mockUser.token);
      service.currentUser.subscribe((user) => {
        expect(user).toEqual(mockUser);
      });
      service.isAuthenticated.subscribe((auth) => {
        expect(auth).toBeTrue();
      });
    });
  });

  describe('populate', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
      service.purgeAuth();
    });

    it('should set auth', () => {
      window.localStorage.jwtToken = mockUser.token;
      service.populate();

      const savedUser = window.localStorage.jwtToken;
      expect(savedUser).toEqual(mockUser.token);

      const req = httpMock.expectOne(`${environment.apiUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should purge auth', () => {
      service.populate();

      const savedUser = window.localStorage.jwtToken;
      expect(savedUser).toBeUndefined();

      httpMock.expectNone(`${environment.apiUrl}/users`);
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
