import { Component, OnInit, OnDestroy } from '@angular/core';
import { CityService } from "../city.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroService } from '../../../cadastro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { City } from '../../../../../shared/models/city.model';

@Component({
  templateUrl: './edit-city.component.html',
  styleUrls: ['./../city.component.scss'],
  providers: [CityService, CadastroService]
})
export class EditCityComponent implements OnInit, OnDestroy {

  title: string;
  id: number;
  cityForm: FormGroup;
  private sub: any;

  constructor(
    private _cadastroService: CadastroService, 
    private _cityService: CityService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        this.title = "Atualizar cidade";
        this.id = +params['id'];
        this.getById(this.id);
      } else {
        this.title = "Cadastrar cidade"
      }
   });

    this.cityForm = this.formBuilder.group({
      id: [undefined],
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
    this._cadastroService.alertRequest(
      (this.id === undefined ? 
        this._cityService.create(this.cityForm.value as City) :
        this._cityService.update(this.cityForm.value as City)), this.back.bind(this)
      );
  }

  private getById(id: number){
    this._cityService.getOne(id)
        .subscribe(
          (c: City) => {
            this.cityForm.patchValue(c);
            console.log(this.cityForm.value);
          },
          e => console.error(e)
        )
  }

  back(){
    this.router.navigate(['pages/cadastro/city']);
  }
}
