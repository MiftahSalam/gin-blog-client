import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtService } from '../services/jwt.service';

import { HttpTokenInterceptor } from './http.token.interceptor';

describe('HttpTokenInterceptor', () => {
  let interceptor: HttpTokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: JwtService,
          useClass: JwtService,
        },
      ],
    });
    interceptor = TestBed.inject(HttpTokenInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
