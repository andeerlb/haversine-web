import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { EnumGroupByPossibleRouter } from '../../shared/models/enum-group-by-possible-router.model';
import { City } from '../../shared/models/city.model';

@Injectable({
  providedIn: 'root'
})
export class RotasPossiveisService {

  constructor(private http:HttpClient) { }

  list(groupBy: EnumGroupByPossibleRouter, radius: any, showIdleCollaborator: any, showOutOfReachByCollaborator, city: any): Observable<any> {
    let parameters = new HttpParams();
    parameters = parameters.append('radius', radius);
    parameters = parameters.append('groupBy', groupBy);
    parameters = parameters.append('idlbeCollaborator', showIdleCollaborator);
    parameters = parameters.append('outOfReachByCollaborator', showOutOfReachByCollaborator);

    if(city !== null && city !== undefined) {
      parameters = parameters.append('city', city);
    }
    return this.http.get(`${env.api}/routers/possibles`, {params: parameters});
  }

  listOfCities(): Observable<City> {
    return this.http.get(`${env.api}/city/all`) as Observable<City>;
  }
}
