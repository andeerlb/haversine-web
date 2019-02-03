import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

/* children components */
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { StoreComponent } from './components/store/store.component';
import { CityComponent } from './components/city/city.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CadastroComponent,
        children: [
            { path: '', redirectTo: 'collaborator', pathMatch: 'full' },
            { path: 'collaborator', component: CollaboratorComponent},
            { path: 'store', component: StoreComponent},
            { path: 'city', component: CityComponent}
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
