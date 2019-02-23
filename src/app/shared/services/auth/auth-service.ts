import { Injectable } from '@angular/core';
import { TokenStorage } from './token-storage';
import 'rxjs/add/operator/do';
import { AuthToken } from '../../models/auth-token.model';

@Injectable({providedIn: "root"})
export class AuthService {

  constructor(private _tokenStorage: TokenStorage){
  }

  isAuthenticated(): boolean {
    let authToken: AuthToken = this._tokenStorage.get();
    return !(!authToken || !authToken.access_token);
  }
}