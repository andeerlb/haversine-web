import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { Store } from '../../../../shared/models/store.model';

@Injectable()
export class StoreService {
    constructor(private http: HttpClient) {
    }

    create(store: Store): Observable<Store> {
        return this.http.post(`${env.api}/store`, store) as Observable<Store>;
      }
}
