import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CollaboratorService } from '../collaborator.service';
import { Collaborator } from '../../../../../shared/models/collaborator.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-collaborator',
  templateUrl: './view-collaborator.component.html',
  styleUrls: ['./../collaborator.component.scss'],
  providers: [CollaboratorService]
})
export class ViewCollaboratorComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'latitude', 'longitude', 'city','edit', 'delete'];
  dataSource = new MatTableDataSource();
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private _collaboratorService: CollaboratorService) {
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this._collaboratorService.getAll()
        .subscribe(
      colaborators => this.dataSource = colaborators,
      errors => console.log(errors)
    );
  }

  create(){
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

  edit(collaborator: Collaborator) {
    console.log(collaborator);
    this.router.navigate(['./edit', collaborator.id], {relativeTo: this.route});
  }

  delete(colaborator: Collaborator) {
    console.log(colaborator);
    this._collaboratorService.delete(colaborator)
        .subscribe(
          r => {
            console.log(r)
            if(r) {
              this.getAll();
            }
          },
          e => console.error(e)
        );
  }
}
