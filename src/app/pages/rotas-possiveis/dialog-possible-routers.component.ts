import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dialog-possible-routers',
  templateUrl: 'dialog-possible-routers.html',
  styleUrls: ['./rotas-possiveis.component.scss'],
})
export class DialogPossibleRouters {

  title: String;
  collaboradtorName: String;
  displayedColumns: string[] = ['position', 'name', 'latitude', 'longitude', 'distance', 'map'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<DialogPossibleRouters>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.collaboradtorName = data[0].collaborator.name;
    this.dataSource = data[0].store,
    this.title = this.defineTitle(data[2]);
  }

  private defineTitle(typeOfFilterRadio: String): String{
    switch (typeOfFilterRadio) {
      case "ONY_COLLABORATORS_WITH_ROUTERS":
        return "Possíveis rotas para";
      case "OUT_OF_REACH":
        return "Lojas fora de alcance para";
    }
  }

  exit(): void {
    this.dialogRef.close();
  }

  openMap(store: any){
    alert(`Deveria abrir o mapa e traçar a rota entre o colaborador ${this.collaboradtorName} e o estabelecimento ${store.name}`);
  }

}