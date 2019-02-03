import { Component, OnInit } from '@angular/core';
import { StoreService } from "./store.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Collaborator } from '../../../../shared/models/collaborator.model';
import { CadastroService } from '../../cadastro.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [StoreService, CadastroService]
})
export class StoreComponent implements OnInit {

  storeForm: FormGroup;

  constructor(private _cadastroService: CadastroService, private _storeService: StoreService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.storeForm = this.formBuilder.group({
      name: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, [Validators.required]]
    });
  }

  get f() { return this.storeForm.controls; }

  getErrorMessage() {
    return this.f.name.hasError('required') ? 'O preenchimento do campo é obrigatório!' : 'O campo aceita apenas valores numéricos!';
  }

  onSubmit() {
    if (this.storeForm.invalid) {
      console.log("is invalid form");
      return;
    }
    this._cadastroService.alertRequest(this._storeService.create(this.storeForm.value));
  }
}
