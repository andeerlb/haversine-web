import { City } from './city.model';

export interface Store {
    id: Number;
    name: String;
    latitude: Number;
    longitude: Number;
    city: City;
}