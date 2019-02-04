import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { Collaborator } from '../../../../shared/models/collaborator.model';

@Injectable()
export class CollaboratorService {
    constructor(private http: HttpClient) {
    }

    create(collaborator: Collaborator): Observable<Collaborator> {
        return this.http.post(`${env.api}/collaborator`, collaborator) as Observable<Collaborator>;
    }

    update(collaborator: Collaborator): Observable<Collaborator> {
        return this.http.put(`${env.api}/collaborator/${collaborator.id}`, collaborator) as Observable<Collaborator>;
     }


    getAll(): Observable<any> {
        return this.http.get(`${env.api}/collaborator/all`) as Observable<Collaborator>;
    }

    getOne(id: any): Observable<any> {
        let parameters = new HttpParams();
        parameters = parameters.append('id', id);
        return this.http.get(`${env.api}/collaborator`, {params: parameters}) as Observable<Collaborator>;
    }
}
