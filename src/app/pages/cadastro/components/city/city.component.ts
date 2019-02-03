import { Component, OnInit } from '@angular/core';
import { CityService } from "./city.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroService } from '../../cadastro.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  providers: [CityService, CadastroService]
})
export class CityComponent implements OnInit {

  cityForm: FormGroup;

  constructor(private _cadastroService: CadastroService, private _cityService: CityService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.cityForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  get f() { return this.cityForm.controls; }

  getErrorMessage() {
    return this.f.name.hasError('required') ? 'O preenchimento do campo é obrigatório!' : 'O campo aceita apenas valores numéricos!';
  }

  onSubmit() {
    if (this.cityForm.invalid) {
      console.log("is invalid form");
      return;
    }
    this._cadastroService.alertRequest(this._cityService.create(this.cityForm.value));
  }
}
