import { Routes, RouterModule } from '@angular/router';
import { RotasPossiveis } from './rotas-possiveis.component';

const childRoutes: Routes = [
    {
        path: '',
        component: RotasPossiveis
    }
];

export const routing = RouterModule.forChild(childRoutes);
