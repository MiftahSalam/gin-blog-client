import { TestBed } from '@angular/core/testing';

import { HomeAuthResolverService } from './home-auth-resolver.service';

describe('HomeAuthResolverService', () => {
  let service: HomeAuthResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeAuthResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
