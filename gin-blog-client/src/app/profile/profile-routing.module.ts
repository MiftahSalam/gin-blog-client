import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

import { ProfilePage } from './profile.page';
import { ProfileResolverService } from './services/profile-resolver.service';

const routes: Routes = [
  {
    path: ':username',
    component: ProfilePage,
    resolve: {
      profile: ProfileResolverService,
    },
    children: [
      {
        path: '',
        component: ArticleComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
