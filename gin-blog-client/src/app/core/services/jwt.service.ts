import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
('jwt-decode');

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  getToken(): string {
    if (window.localStorage.jwtToken) {
      console.log(
        'core-services-users-jwtservice-gettoken jwtToken',
        window.localStorage.jwtToken
      );
      const decodedToken: { exp: number; id: number } = jwtDecode(
        window.localStorage.jwtToken
      );
      const expiredDate = new Date(decodedToken.exp * 1000).toLocaleString();
      const isExpired = Date.now() > decodedToken.exp * 1000;
      // console.log(
      //   'core-services-users-jwtservice-gettoken decodedToken',
      //   decodedToken
      // );
      // console.log('core-services-users-jwtservice-gettoken exp', expiredDate);
      // console.log('core-services-users-jwtservice-gettoken now', new Date());
      console.log(
        'core-services-users-jwtservice-gettoken isExpired',
        isExpired
      );
      // console.log(
      //   'core-services-users-jwtservice-gettoken remain',
      //   Date.now() - decodedToken.exp * 1000
      // );
      if (isExpired) {
        this.destroyToken();
      }
    }
    return window.localStorage.jwtToken;
  }

  saveToken(token: string) {
    window.localStorage.jwtToken = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
