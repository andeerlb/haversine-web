import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dialog-possible-routers',
  templateUrl: 'dialog-possible-routers.html',
  styleUrls: ['./rotas-possiveis.component.scss'],
})
export class DialogPossibleRouters {

  collaboradtorName: String;
  displayedColumns: string[] = ['position', 'name', 'latitude', 'longitude', 'distance', 'map'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<DialogPossibleRouters>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.collaboradtorName = data[0].collaborator.name;
    this.dataSource = data[0].store,
    console.log(data[0]);
  }

  exit(): void {
    this.dialogRef.close();
  }

  openMap(store: any){
    alert(`Deveria abrir o mapa e traçar a rota entre o colaborador ${this.collaboradtorName} e o estabelecimento ${store.name}`);
  }

}