import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from "./collaborator.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Collaborator } from '../../../../shared/models/collaborator.model';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss'],
  providers: [CollaboratorService]
})
export class CollaboratorComponent implements OnInit {

  collaboratorForm: FormGroup;

  constructor(private _collaborator: CollaboratorService, private formBuilder: FormBuilder) { }

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

    this._collaborator.create(this.collaboratorForm.value as Collaborator)
                      .subscribe(
                        c => {
                          console.log('SUCCESS!! :-)\n\n' + JSON.stringify(c))
                        },
                        error => console.log(error),
                        () => {
                          this.collaboratorForm.reset();
                        })
  }
}
