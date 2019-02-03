import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from "./collaborator.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Collaborator } from '../../../../shared/models/collaborator.model';
import { CadastroService } from '../../cadastro.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss'],
  providers: [CollaboratorService, CadastroService]
})
export class CollaboratorComponent implements OnInit {

  collaboratorForm: FormGroup;

  constructor(private _cadastroService: CadastroService, private _collaborator: CollaboratorService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.collaboratorForm = this.formBuilder.group({
      name: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, [Validators.required]]
    });
  }

  get f() { return this.collaboratorForm.controls; }

  getErrorMessage() {
    return this.f.name.hasError('required') ? 'O preenchimento do campo é obrigatório!' : 'O campo aceita apenas valores numéricos!';
  }

  onSubmit() {
    if (this.collaboratorForm.invalid) {
      console.log("is invalid form");
      return;
    }
    this._cadastroService.alertRequest(this._collaborator.create(this.collaboratorForm.value as Collaborator));
  }
}
