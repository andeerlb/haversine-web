import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from "../store.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroService } from '../../../cadastro.service';
import { RotasPossiveisService } from '../../../../rotas-possiveis/rotas-possiveis.service';
import { Observable } from 'rxjs';
import { City } from '../../../../../shared/models/city.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '../../../../../shared/models/store.model';

@Component({
  templateUrl: './edit-store.component.html',
  styleUrls: ['./../store.component.scss'],
  providers: [StoreService, CadastroService, RotasPossiveisService]
})
export class EditStoreComponent implements OnInit, OnDestroy {

  title: String;
  id: Number;
  private sub: any;
  storeForm: FormGroup;
  cities: Observable<City>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _cadastroService: CadastroService, 
    private _rotasPossiveisService: RotasPossiveisService, 
    private _storeService: StoreService, private formBuilder: FormBuilder
    ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.cities = this.listOfCities();

    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        this.title = "Atualizar estabelecimento";
        this.id = +params['id'];
        this.getById(this.id);
      } else {
        this.title = "Cadastrar estabelecimento"
      }
   });

    this.storeForm = this.formBuilder.group({
      id: [undefined],
      name: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, [Validators.required]],
      cityId: [null, Validators.required]
    });
  }

  get f() { return this.storeForm.controls; }

  getErrorMessage() {
    return this.f.name.hasError('required') ? 'O preenchimento do campo é obrigatório!' : 'O campo aceita apenas valores numéricos!';
  }

  private getById(id: Number){
    this._storeService.getOne(id)
        .subscribe(
          (s: Store) => {
            this.storeForm.patchValue(s);
            console.log(this.storeForm.value);
            
          },
          e => console.error(e)
        )
  }

  private listOfCities(): Observable<City> {
    return this._rotasPossiveisService.listOfCities();
  }

  onSubmit() {
    if (this.storeForm.invalid) {
      console.log("is invalid form");
      return;
    }
    this._cadastroService.alertRequest(
      (this.id === undefined ? 
        this._storeService.create(this.storeForm.value as Store) :
        this._storeService.update(this.storeForm.value as Store)), this.back.bind(this));
  }

  back(){
    this.router.navigate(['pages/cadastro/store']);
  }
}
