import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TokenStorage } from './token-storage';
import { Router } from '@angular/router';
import { RootComponent } from '../../components/root/root.component';
import { GlobalService } from '../global.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import { TypeNotification } from '../../models/type-notification.model';

@Injectable({providedIn: "root"})
export class AuthInterceptor extends RootComponent implements HttpInterceptor {

  constructor(private _tokenStorage: TokenStorage, 
              private _router: Router,
              public _globalService: GlobalService){
    super(_globalService);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;

    try{ 
      token = this._tokenStorage.get().access_token;
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    } catch(err) {
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
                if(err.status === 401) {
                  this._router.navigateByUrl("/login").then(()=>{
                    this.notification(TypeNotification.WARNING)
                  })
                }
              }
            });
  }

  notification(type: TypeNotification) {
    this.alertMessage(
      {
        type: type,
        title: 'Look here!',
        value: 'This alert needs your attention.'
      }
    );
  }
}