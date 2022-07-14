import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { NoAuthGuardService } from './no-auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthPage,
    canActivate: [NoAuthGuardService],
  },
  {
    path: 'register',
    component: AuthPage,
    canActivate: [NoAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
