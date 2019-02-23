import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CityService } from '../city.service';
import { City } from '../../../../../shared/models/city.model';
import { Observable } from 'rxjs';
import { CustomDataTable } from '../../../../../shared/components/custom-data-table/custom-data-table.interface';
import { CustomDataTableColumn } from '../../../../../shared/models/custom-data-table-column.model';

@Component({
  templateUrl: './view-city.component.html',
  styleUrls: ['./../city.component.scss'],
  providers: [CityService]
})
export class ViewCityComponent implements OnInit, CustomDataTable {

  displayedColumns: CustomDataTableColumn[] = [
    new CustomDataTableColumn("name", "nome")
  ];
  
  constructor(private router: Router, 
              public route: ActivatedRoute,
              private _cityService: CityService) {
  }

  ngOnInit() {
  }

  getAll(): Observable<any> {
    return this._cityService.getAll();
  }

  create(){
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

  delete(city: City): Observable<any> {
    return this._cityService.delete(city);
  }
}
