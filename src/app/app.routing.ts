import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/rotaspossiveis',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/rotaspossiveis'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
