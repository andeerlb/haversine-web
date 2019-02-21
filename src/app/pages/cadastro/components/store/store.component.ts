import { Component, OnInit } from '@angular/core';
import { StoreService } from "./store.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroService } from '../../cadastro.service';
import { RotasPossiveisService } from '../../../rotas-possiveis/rotas-possiveis.service';
import { Observable } from 'rxjs';
import { City } from '../../../../shared/models/city.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [StoreService, CadastroService, RotasPossiveisService]
})
export class StoreComponent implements OnInit {

  storeForm: FormGroup;
  cities: Observable<City>;

  constructor(private _cadastroService: CadastroService, private _rotasPossiveisService: RotasPossiveisService, private _storeService: StoreService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.cities = this.listOfCities();
    this.storeForm = this.formBuilder.group({
      name: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, [Validators.required]],
      city: [null, Validators.required]
    });
  }

  get f() { return this.storeForm.controls; }

  getErrorMessage() {
    return this.f.name.hasError('required') ? 'O preenchimento do campo é obrigatório!' : 'O campo aceita apenas valores numéricos!';
  }

  private listOfCities(): Observable<City> {
    return this._rotasPossiveisService.listOfCities();
  }

  onSubmit() {
    if (this.storeForm.invalid) {
      console.log("is invalid form");
      return;
    }
    this._cadastroService.alertRequest(this._storeService.create(this.storeForm.value), function() {alert('not function')});
  }
}
