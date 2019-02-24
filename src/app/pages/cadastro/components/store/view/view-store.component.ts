import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Store } from '../../../../../shared/models/store.model';
import { StoreService } from '../store.service';
import { CustomDataTableColumn } from '../../../../../shared/models/custom-data-table-column.model';
import { CustomDataTable } from '../../../../../shared/components/custom-data-table/custom-data-table.interface';
import { Observable } from 'rxjs';
import { Pageable } from '../../../../../shared/models/pageable.model';

@Component({
  templateUrl: './view-store.component.html',
  styleUrls: ['./../store.component.scss'],
  providers: [StoreService]
})
export class ViewStoreComponent  implements OnInit, CustomDataTable{

  displayedColumns: CustomDataTableColumn[] = [
    new CustomDataTableColumn("name", "nome"),
    new CustomDataTableColumn("latitude", "latitude"),
    new CustomDataTableColumn("longitude", "longitude")
  ];
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private _storeService: StoreService) {
  }

  ngOnInit() {
  }

  getAll(pageable: Pageable): Observable<any> {
    return this._storeService.getAll(pageable);
  }

  create(){
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

  delete(store: Store): Observable<any> {
    return this._storeService.delete(store);
  }
}
