import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { environment as env } from '../../../environments/environment';
import { RequestOptions } from '@angular/http';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient){
    }

    authenticate(user: User) {
        const httpHeaders = new HttpHeaders()
                    .set('Authorization',`Basic ${btoa(`${user.client_id}:${user.client_secret}`)}`)
                    .set('Content-Type','application/json');

        const httpParams = new HttpParams()
                    .set('username', user.username)
                    .set('password', user.password)
                    .set('grant_type', 'password');

        return this.http.post(`${env.api}/oauth/token`, {}, {headers: httpHeaders, params: httpParams});
    }
}