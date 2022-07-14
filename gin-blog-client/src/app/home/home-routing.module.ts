import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HomeAuthResolverService } from './services/home-auth-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {
      isAuthenticated: HomeAuthResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
