import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollaboratorService } from "../collaborator.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Collaborator } from '../../../../../shared/models/collaborator.model';
import { CadastroService } from '../../../cadastro.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./../collaborator.component.scss'],
  providers: [CollaboratorService, CadastroService]
})
export class EditCollaboratorComponent implements OnInit, OnDestroy {

  title: String;
  id: Number;
  private sub: any;
  collaboratorForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _cadastroService: CadastroService, 
    private _collaborator: CollaboratorService, 
    private formBuilder: FormBuilder) {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        this.title = "Atualizar colaborador";
        this.id = +params['id'];
        this.getById(this.id);
      } else {
        this.title = "Cadastrar colaborador"
      }
   });

    this.collaboratorForm = this.formBuilder.group({
      id: [undefined],
      name: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, [Validators.required]]
    });
  }

  private getById(id: Number){
    this._collaborator.getOne(id)
        .subscribe(
          (c: Collaborator) => {
            console.log(c);
            this.collaboratorForm.patchValue(c);
          },
          e => console.error(e)
        )
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
    this._cadastroService.alertRequest(
      this.id === undefined ? 
        this._collaborator.create(this.collaboratorForm.value as Collaborator) :
        this._collaborator.update(this.collaboratorForm.value as Collaborator)
      );
  }

  back(){
    this.router.navigate(['pages/cadastro/collaborator']);
  }
}
