import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
import { Store } from '../../../../shared/models/store.model';
import { City } from '../../../../shared/models/city.model';

@Injectable()
export class CityService {
    constructor(private http: HttpClient) {
    }

    create(city: City): Observable<City> {
        return this.http.post(`${env.api}/city`, city) as Observable<City>;
      }
}
