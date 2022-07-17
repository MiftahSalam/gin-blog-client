import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedModule } from '../shared/shared.module';
import { ArticleComponent } from './components/article/article.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule,
  ],
  declarations: [ProfilePage, ArticleComponent, FavoritesComponent],
})
export class ProfilePageModule {}
