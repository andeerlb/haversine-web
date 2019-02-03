import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
