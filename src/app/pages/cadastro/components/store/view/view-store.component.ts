import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import { CadastroService } from '../../../cadastro.service';
import { Store } from '../../../../../shared/models/store.model';
import { StoreService } from '../store.service';

@Component({
  templateUrl: './view-store.component.html',
  styleUrls: ['./../store.component.scss'],
  providers: [StoreService, CadastroService]
})
export class ViewStoreComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'latitude', 'longitude', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private _cadastroService: CadastroService,
              private _storeService: StoreService) {
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this._storeService.getAll()
        .subscribe(
          store => this.dataSource = store as any,
      errors => console.log(errors)
    );
  }

  create(){
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

  edit(store: Store) {
    console.log(store);
    this.router.navigate(['./edit', store.id], {relativeTo: this.route});
  }

  delete(store: Store) {
    console.log(store);
    this._cadastroService.deleteConfirm(this._storeService.delete(store))
      .then(
        () => {
          this.getAll();
        }
      ).catch(
        e => console.error(e)
      );
  }
}
