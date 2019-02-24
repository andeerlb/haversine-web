import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CustomDataTableColumn } from '../../models/custom-data-table-column.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroService } from '../../../pages/cadastro/cadastro.service';
import { Pageable } from '../../models/pageable.model';

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
  private delete: Function;

  private onlyDisplayColumnsName: string[];
  rows: any[];
  showDataTable: boolean = false;
  pageable: Pageable;
  pages: string[] = [];

  constructor(private _router: Router, private _cadastroService: CadastroService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.pageable = new Pageable('0', '10');
    this.dataTableGetAll();
    this.onlyDisplayColumnsName = this.displayedColumns.map((column: CustomDataTableColumn) => column.name);
  }

  ngOnDestroy(): void {
    this.showDataTable = false;
  }

  public pagination(page: string) {
    this.pageable.page = page;
    this.dataTableGetAll();
  }
  private dataTableGetAll(): void {
    this.getAll(this.pageable).subscribe(
      value => {
        this.rows = value.content;
        this.pageable = value.pageable;        
        this.showDataTable = true;

        let i: number = 0;
        while(this.pages.length < value.totalPages){
          this.pages.push(i.toString());
          i++;
        }
      }
    );
  }

  public qtd(qtd: string){
    this.pageable.size = qtd;
    this.dataTableGetAll();
  }

  public dataTableEdit(row) {
    this._router.navigate(['./edit', row.id], {relativeTo: this._route});
  }

  public dataTableDelete(row, index){
    this._cadastroService.deleteConfirm(this.delete(row))
      .then((value) => {
        console.log(value);
        this.rows.splice(index, 1);
    }).catch((e) => console.error(e));
  }

  public checkPropertyExistsOnArrayColumns(row: object): string[] {
      let keysObject = Object.keys(row)
                  .filter(keyName => this.onlyDisplayColumnsName.includes(keyName));

      let keysPrototype = this.onlyDisplayColumnsName.filter(key => !keysObject.includes(key));                  
      keysPrototype.forEach(key => row[key] = "");

      return keysObject.map(key => row[key]);
  }
}
