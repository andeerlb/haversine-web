import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

/* children components */
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { StoreComponent } from './components/store/store.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CadastroComponent,
        children: [
            { path: '', redirectTo: 'collaborator', pathMatch: 'full' },
            { path: 'collaborator', component: CollaboratorComponent},
            { path: 'store', component: StoreComponent},
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
