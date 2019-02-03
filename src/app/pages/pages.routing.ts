import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

export const childRoutes: Routes = [
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'rotaspossiveis', loadChildren: './rotas-possiveis/rotas-possiveis.module#RotasPossiveisModule' },
            { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroModule' },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
