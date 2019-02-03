import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './cadastro.routing';
import { SharedModule } from '../../shared/shared.module';

/* components */
import { CadastroComponent } from './cadastro.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { StoreComponent } from './components/store/store.component';
import { CityComponent } from './components/city/city.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing
    ],
    declarations: [
        CadastroComponent,
        CollaboratorComponent,
        StoreComponent,
        CityComponent
    ]
})
export class CadastroModule { }
