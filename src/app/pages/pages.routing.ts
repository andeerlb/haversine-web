import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';

export const childRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
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
