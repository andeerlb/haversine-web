import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestService {

    private defaultUrl: String;

    constructor(private http: HttpClient, defaultUrl: String) {
        this.defaultUrl = defaultUrl;
    }

    get(id: string): Observable<any> {
        return this.http.get(`${env}/${this.defaultUrl}/${id}`);
    }

    save(data: any) {
        return this.http.post(`${env}/${this.defaultUrl}`, data);
    }

    update(id: string, data: any) {
        return this.http.put(`${env}/${this.defaultUrl}/${id}`, data);
    }

    delete(id: string) {
        return this.http.delete(`${env}/${this.defaultUrl}/${id}`);
    }
}