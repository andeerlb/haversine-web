import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

/* children components */
import { EditCollaboratorComponent } from './components/collaborator/edit/edit-collaborator.component';
import { ViewCollaboratorComponent } from './components/collaborator/view/view-collaborator.component';
import { EditCityComponent } from './components/city/edit/edit-city.component';
import { EditStoreComponent } from './components/store/edit/edit-store.component';
import { ViewCityComponent } from './components/city/view/view-city.component';
import { ViewStoreComponent } from './components/store/view/view-store.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CadastroComponent,
        children: [
            { path: '', redirectTo: 'collaborator', pathMatch: 'full' },
            { path: 'collaborator',
                children: [
                    { path: '', component: ViewCollaboratorComponent},
                    { path: 'create', component: EditCollaboratorComponent},
                    { path: 'edit/:id', component: EditCollaboratorComponent},
                    { path: 'view', component: ViewCollaboratorComponent},
                ]
            },
            { path: 'store', 
                children: [
                    { path: '', component: ViewStoreComponent},
                    { path: 'create', component: EditStoreComponent},
                    { path: 'edit/:id', component: EditStoreComponent},
                    { path: 'view', component: ViewStoreComponent},
                ]
            },
            { path: 'city',
                children: [
                    { path: '', component: ViewCityComponent},
                    { path: 'create', component: EditCityComponent},
                    { path: 'edit/:id', component: EditCityComponent},
                    { path: 'view', component: ViewCityComponent},
                ]
            }
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
