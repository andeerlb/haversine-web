import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

@Injectable()
export class PagesTopService {
    constructor(private http: HttpClient){
    }

    getUserLogged() {
        return this.http.get(`${env.api}/useraccount`);
    }

    logout() {
        return this.http.get(`${env.api}/useraccount/logout`);
    }
}