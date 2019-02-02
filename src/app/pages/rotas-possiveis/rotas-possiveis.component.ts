import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { EnumGroupByPossibleRouter } from '../../shared/models/enum-group-by-possible-router.model';
import { GroupByPossibleRouter } from '../../shared/models/group-by-possible-router';
import { RotasPossiveisService } from './rotas-possiveis.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogPossibleRouters } from './dialog-possible-routers.component';

@Component({
  selector: 'app-rotas-possiveis',
  templateUrl: './rotas-possiveis.component.html',
  styleUrls: ['./rotas-possiveis.component.scss'],
  providers: [RotasPossiveisService]
})

export class RotasPossiveis implements OnInit {
  constructor(public dialog: MatDialog, private service: RotasPossiveisService) { }

  showIdleCollaborator = false;
  showOutOfReachByCollaborator = false;
  displayedColumns: string[] = ['position', 'name', 'latitude', 'longitude','router'];
  dataSource = new MatTableDataSource();
  groupControl = new FormControl(EnumGroupByPossibleRouter.PERSON, [Validators.required]);
  radiusControl = new FormControl(2, [Validators.required]);

  groupBy: GroupByPossibleRouter[] = [
    {value: EnumGroupByPossibleRouter.PERSON, viewValue: 'Pessoa'},
    {value: EnumGroupByPossibleRouter.STORE, viewValue: 'Estabelecimento'}
  ];

  ngOnInit() {
    this.dataSource.filterPredicate = (data: {collaborator: {name: string}}, filterValue: string) => data.collaborator.name.trim().toLowerCase().indexOf(filterValue) !== -1;
    this.list(this.groupControl.value, this.radiusControl.value);
  }

  find(groupBy: EnumGroupByPossibleRouter, radius: Number): void {
    this.list(groupBy, radius);
  }

  private list(groupBy: EnumGroupByPossibleRouter, radius: Number): void {
    this.service.list(groupBy, radius, this.showIdleCollaborator, this.showOutOfReachByCollaborator)
        .subscribe(
      colaborators => this.dataSource = colaborators,
      errors => console.log(errors)
    );
  }

  applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
  }

  changeToggleValue(event: any) {
    switch (event) {
      case "ONY_COLLABORATORS_WITH_ROUTERS":
        this.showIdleCollaborator = false;
        this.showOutOfReachByCollaborator = false;
        break;
      case "OUT_OF_REACH":
        this.showIdleCollaborator = false;
        this.showOutOfReachByCollaborator = true;
        break;
      case "IDLE_COLLABORATOR":
        this.showIdleCollaborator = true;
        this.showOutOfReachByCollaborator = false;
        break;
    }
    this.list(this.groupControl.value, this.radiusControl.value);
  }

  openRouter(el: any): void {
    const dialogRef = this.dialog.open(DialogPossibleRouters, {
      data: [el, this.radiusControl.value, this.showOutOfReachByCollaborator],
      panelClass: 'app-full-dialog'
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        console.log(`The dialog routers of user was #${el.collaborator.id} closed`);
    });
  }
}