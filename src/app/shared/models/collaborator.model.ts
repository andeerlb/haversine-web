import { City } from './city.model';

export interface Collaborator {
    id: Number;
    name: String;
    latitude: Number;
    longitude: Number;
    city: City
}