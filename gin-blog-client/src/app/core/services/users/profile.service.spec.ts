import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProfileService } from './profile.service';
import { Profile } from '../../models/users/profile';
import { environment } from 'src/environments/environment';

const mockProfile: Profile = {
  bio: 'bio',
  following: false,
  image: 'image',
  username: 'miftah',
};

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should get user profile', () => {
      service.get('miftah').subscribe((profile) => {
        console.log('profile', profile);

        expect(profile).toEqual(mockProfile);
      });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/profile/${mockProfile.username}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockProfile);
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
