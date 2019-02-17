
import { Injectable } from '@angular/core';
import { AuthToken } from '../../models/auth-token.model';

const TOKEN_KEY = 'authToken';

@Injectable()
export class TokenStorage {

  constructor() { }

  save(token: AuthToken): void {
    window.localStorage[TOKEN_KEY] = btoa(JSON.stringify(token ? token : null));
  }

  get(): AuthToken {
    let token = window.localStorage[TOKEN_KEY];
    return (token ? JSON.parse(atob(token)) : null) as AuthToken;
  }

  remove() {
    window.localStorage.removeItem(TOKEN_KEY);
  }

}