import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './rotas-possiveis.routing';
import { SharedModule } from '../../shared/shared.module';
import { RotasPossiveis } from './rotas-possiveis.component';
import { DialogPossibleRouters } from './dialog-possible-routers.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        RotasPossiveis,
        DialogPossibleRouters
    ],
    entryComponents: [
        DialogPossibleRouters
    ]
}) 
export class RotasPossiveisModule { }
