import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { City } from '../../../../shared/models/city.model';

@Injectable()
export class CityService {
  constructor(private http: HttpClient) {
  }

  create(city: City): Observable<City> {
    return this.http.post(`${env.api}/city`, city) as Observable<City>;
  }

  update(city: City): Observable<City> {
    return this.http.put(`${env.api}/city/${city.id}`, city) as Observable<City>;
 }

  getAll(): Observable<City> {
    return this.http.get(`${env.api}/city/all`) as Observable<City>;
  }

  delete(city: City): Observable<City> {
    return this.http.delete(`${env.api}/city/${city.id}`) as Observable<City>;
  }

  getOne(id: any): Observable<any> {
    let parameters = new HttpParams();
    parameters = parameters.append('id', id);
    return this.http.get(`${env.api}/city`, {params: parameters}) as Observable<City>;
  }
}
