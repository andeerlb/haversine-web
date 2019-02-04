import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

/* children components */
import { EditCollaboratorComponent } from './components/collaborator/edit/edit-collaborator.component';
import { ViewCollaboratorComponent } from './components/collaborator/view/view-collaborator.component';
import { StoreComponent } from './components/store/store.component';
import { CityComponent } from './components/city/city.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CadastroComponent,
        children: [
            { path: '', redirectTo: 'collaborator', pathMatch: 'full' },
            { path: 'collaborator',
                children: [
                    { path: '', component: ViewCollaboratorComponent},
                    { path: 'edit', component: EditCollaboratorComponent},
                    { path: 'edit/:id', component: EditCollaboratorComponent},
                    { path: 'view', component: ViewCollaboratorComponent},
                ]
            },
            { path: 'store', component: StoreComponent},
            { path: 'city', component: CityComponent}
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
