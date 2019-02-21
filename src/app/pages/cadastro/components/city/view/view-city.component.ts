import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {Router, ActivatedRoute} from '@angular/router';
import { CadastroService } from '../../../cadastro.service';
import { CityService } from '../city.service';
import { City } from '../../../../../shared/models/city.model';

@Component({
  templateUrl: './view-city.component.html',
  styleUrls: ['./../city.component.scss'],
  providers: [CityService, CadastroService]
})
export class ViewCityComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private _cadastroService: CadastroService,
              private _cityService: CityService) {
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this._cityService.getAll()
        .subscribe(
      city => this.dataSource = city as any,
      errors => console.log(errors)
    );
  }

  create(){
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

  edit(city: City) {
    console.log(city);
    this.router.navigate(['./edit', city.id], {relativeTo: this.route});
  }

  delete(city: City) {
    console.log(city);
    this._cadastroService.deleteConfirm(this._cityService.delete(city))
      .then(
        () => {
          this.getAll();
        }
      ).catch(
        e => console.error(e)
      );
  }
}
