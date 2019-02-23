import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from '../collaborator.service';
import { Collaborator } from '../../../../../shared/models/collaborator.model';
import {Router, ActivatedRoute} from '@angular/router';
import { CustomDataTable } from '../../../../../shared/components/custom-data-table/custom-data-table.interface';
import { CustomDataTableColumn } from '../../../../../shared/models/custom-data-table-column.model';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './view-collaborator.component.html',
  styleUrls: ['./../collaborator.component.scss'],
  providers: [CollaboratorService]
})
export class ViewCollaboratorComponent implements OnInit, CustomDataTable {

  displayedColumns: CustomDataTableColumn[] = [
    new CustomDataTableColumn("name", "nome"),
    new CustomDataTableColumn("latitude", "latitude"),
    new CustomDataTableColumn("longitude", "longitude"),
    new CustomDataTableColumn("cityName", "Cidade")
  ];
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private _collaboratorService: CollaboratorService) {
  }

  ngOnInit() {
  }

  getAll(): Observable<any> {
    return this._collaboratorService.getAll();
  }

  create(){
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

  delete(colaborator: Collaborator) {
    return this._collaboratorService.delete(colaborator);
  }
}
