import { TestBed } from '@angular/core/testing';

import { JwtService } from './jwt.service';

const mockJwtToken = 'myToken';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be save token', () => {
    service.saveToken(mockJwtToken);
    const savedToken = service.getToken();
    expect(savedToken).toEqual(mockJwtToken);
  });

  describe('get token', () =>{
    it('should get empty token', () => {
      const savedToken = service.getToken();
      expect(savedToken).toBeUndefined();
    });

    it('should get proper token', () => {
      service.saveToken(mockJwtToken);
      const savedToken = service.getToken();
      expect(savedToken).toEqual(mockJwtToken);
      });
  });

  it('should be destroy token', () => {
    service.destroyToken();
    const savedToken = service.getToken();
    expect(savedToken).toBeUndefined();
  });

  afterEach(() => {
    service.destroyToken();
  });
});
