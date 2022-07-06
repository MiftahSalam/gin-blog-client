import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../../models/users/profile';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  get(username: string): Observable<Profile> {
    return this.apiService
      .get(`profile/${username}`)
      .pipe(map((data: Profile) => data));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post(`profile/${username}/follow`);
  }

  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete(`profile/${username}/follow`);
  }
}
