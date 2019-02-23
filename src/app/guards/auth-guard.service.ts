import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivateChild(): boolean {
    if (this._authService.isAuthenticated()) {
        return true;
    }
    this._router.navigateByUrl('/login');
    return false;
  }
 
}
