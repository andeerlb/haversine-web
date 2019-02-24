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
  showPages: string[] = [];
  totalElements: number;

  constructor(private _router: Router, private _cadastroService: CadastroService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.pageable = new Pageable('0', '10');
    this.dataTableGetAll();
    this.onlyDisplayColumnsName = this.displayedColumns.map((column: CustomDataTableColumn) => column.name);
  }

  ngOnDestroy(): void {
    this.showDataTable = false;
  }

  public pagination(page: string, index: number) {
    this.pageable.page = page;
    this.dataTableGetAll();

    let diference = (index > this.showPages.length) ? index - this.showPages.length : this.showPages.length - index;
    this.maxNumbers(diference);
    this.minNumbers(diference, page);
  }

  private minNumbers(diferente: number, page: string): void {   
    if((+this.showPages[0] - 1) < 0 || +page === 0){
      return;
    }

    if(+page === 1){
      this.showPages.pop();
      this.showPages.unshift((+this.showPages[0] - 1).toString());
      return;
    } else if(+page === 2) {
      this.showPages.pop();
      this.showPages.unshift((+this.showPages[0] - 1).toString());
      return;
    }
    
    switch (diferente) {
      case 7:
        this.showPages.pop();
        this.showPages.pop();
        this.showPages.pop();
        this.showPages.unshift((+this.showPages[0] - 1).toString());
        this.showPages.unshift((+this.showPages[0] - 1).toString());
        this.showPages.unshift((+this.showPages[0] - 1).toString());
      break;
      case 6:
        this.showPages.pop();
        this.showPages.pop();
        this.showPages.unshift((+this.showPages[0] - 1).toString());
        this.showPages.unshift((+this.showPages[0] - 1).toString());
      break;
      case 5:
        this.showPages.pop();
        this.showPages.unshift((+this.showPages[0] - 1).toString());
      break;
    }
  }

  private maxNumbers(diferente: number): void {
    switch (diferente) {
      case 1:
        this.showPages.splice(0, 3);
        this.showPages.push((+this.showPages[this.showPages.length - 1] + 1).toString());
        this.showPages.push((+this.showPages[this.showPages.length - 1] + 1).toString());
        this.showPages.push((+this.showPages[this.showPages.length - 1] + 1).toString());
      break;
     case 2:
        this.showPages.splice(0, 2);
        this.showPages.push((+this.showPages[this.showPages.length - 1] + 1).toString());
        this.showPages.push((+this.showPages[this.showPages.length - 1] + 1).toString());
      break;
      case 3:
        this.showPages.splice(0, 1);
        this.showPages.push((+this.showPages[this.showPages.length - 1] + 1).toString());
      break;
    }
  }

  public nextPagination(page: string) {
    this.pageable.page = page;
    this.dataTableGetAll();

    let index = this.showPages.indexOf(((+page) - 1).toString());
    if (index >= 3) {
      this.showPages.splice(0, 1);
      this.showPages.push((+this.showPages[this.showPages.length - 1] + 1).toString());
    }
  }

  public previousPagination(page: string) {
    this.pageable.page = page;
    this.dataTableGetAll();
    if (+page > 2) {
      this.showPages.pop();
      this.showPages.unshift((+this.showPages[0] - 1).toString());
    }
  }

  private dataTableGetAll(): void {
    this.getAll(this.pageable).subscribe(
      value => {
        this.totalElements = value.totalElements;
        this.rows = value.content;
        let currentSize = this.pageable.size;
        this.pageable = value.pageable;
        this.pageable.size = currentSize;
        this.showDataTable = true;
        this.calculateQtdPages(value.totalPages);
      }
    );
  }

  public qtd(qtd: string) {
    this.pageable.size = qtd;
    this.dataTableGetAll();
  }

  public dataTableEdit(row) {
    this._router.navigate(['./edit', row.id], { relativeTo: this._route });
  }

  public dataTableDelete(row, index) {
    console.log(row, index);
    
    this._cadastroService.deleteConfirm(this.delete(row))
      .then((value) => {
        console.log(value);
        this.rows.splice(index, 1);

        if (this.rows.length <= 0 && this.pageable.pageNumber > 0) {
          let n = --this.pageable.pageNumber;
          this.pageable.page = n.toString();
          this.dataTableGetAll();
        }
      }).catch((e) => console.error(e));
  }

  public checkPropertyExistsOnArrayColumns(row: object): string[] {
    let keysObject = Object.keys(row)
      .filter(keyName => this.onlyDisplayColumnsName.includes(keyName));

    let keysPrototype = this.onlyDisplayColumnsName.filter(key => !keysObject.includes(key));
    keysPrototype.forEach(key => row[key] = "");

    return keysObject.map(key => row[key]);
  }


  private calculateQtdPages(totalPages: number) {
    let i: number = this.pages.length;
    if (i < totalPages) {
      while (this.pages.length < totalPages) {
        this.pages.push(i.toString());
        i++;
      }
    } else {
      while (i > totalPages) {
        this.pages.splice(i - 1, 1);
        i--;
      }
    }

    if (this.showPages.length <= 0)
      this.showPages = this.pages.slice(0, 7);
  }
}
