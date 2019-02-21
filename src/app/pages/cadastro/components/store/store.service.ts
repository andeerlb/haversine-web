import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  update(store: Store): Observable<Store> {
    return this.http.put(`${env.api}/store/${store.id}`, store) as Observable<Store>;
  }

  getAll(): Observable<Store> {
    return this.http.get(`${env.api}/store/all`) as Observable<Store>;
  }

  delete(store: Store): Observable<Store> {
    return this.http.delete(`${env.api}/store/${store.id}`) as Observable<Store>;
  }

  getOne(id: any): Observable<any> {
    let parameters = new HttpParams();
    parameters = parameters.append('id', id);
    return this.http.get(`${env.api}/store`, { params: parameters }) as Observable<Store>;
  }
}
