import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { ValidTokenGuard } from './shared/guards/valid-token.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'p/home',
    pathMatch: 'full'
  },
  {
    path: 'p',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [ValidTokenGuard]
  },
  {
    path: 's',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: '**',
    redirectTo: 's/pagina-nao-encontrada',
  },
  {
    path: 's/pagina-nao-encontrada',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
