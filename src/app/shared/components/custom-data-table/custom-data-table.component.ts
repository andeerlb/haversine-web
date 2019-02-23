import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomDataTableColumn } from '../../models/custom-data-table-column.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroService } from '../../../pages/cadastro/cadastro.service';

@Component({
  selector: 'app-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.scss'],
  providers: [CadastroService]
})
export class CustomDataTableComponent implements OnInit, OnDestroy {

  @Input() 
  displayedColumns: CustomDataTableColumn[];

  @Input() 
  private getAll: Function;

  @Input()
  private edit: ActivatedRoute;

  @Input()
  private delete: Function;

  private onlyDisplayColumnsName: string[];
  rows: Observable<any>;

  constructor(private _router: Router, private _cadastroService: CadastroService) { }

  ngOnInit() {
    this.dataTableGetAll();
    this.onlyDisplayColumnsName = this.displayedColumns.map((column: CustomDataTableColumn) => column.name);
  }

  ngOnDestroy(): void {
    console.log('unsubscribe getAll datatable');
  }

  private dataTableGetAll(): void {
    this.rows = this.getAll();
  }

  public dataTableEdit(row) {
    this._router.navigate(['./edit', row.id], {relativeTo: this.edit});
  }

  public dataTableDelete(row){
    this._cadastroService.deleteConfirm(this.delete(row));
  }

  public checkPropertyExistsOnArrayColumns(row: object): string[] {
      return Object.keys(row)
                  .filter(keyName => this.onlyDisplayColumnsName.includes(keyName))
                  .map(keyName => row[keyName]);
  }
}
