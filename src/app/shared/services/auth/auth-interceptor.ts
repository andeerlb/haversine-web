import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TokenStorage } from './token-storage';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import 'rxjs/add/operator/do';

@Injectable({providedIn: "root"})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _tokenStorage: TokenStorage, private _router: Router){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token: string;

    try{ 
      token = this._tokenStorage.get().access_token;
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    } catch(err) {
      this._tokenStorage.remove();
      if(!req.params.has('grant_type')){
        this._router.navigateByUrl("/login");
      }
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    if (!req.headers.has('Accept')) {
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    }

    return next.handle(req)
            .do(() => {}, (err: any) => {
              if (err instanceof HttpErrorResponse) {
                console.error('error in HttpRequest');
              }
          });
  }
}