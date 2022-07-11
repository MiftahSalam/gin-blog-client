import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShowAuthedDirective } from './show-authed.directive';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { FollowComponent } from './buttons/follow/follow.component';
import { ArticleMetaComponent } from './articles/article-meta/article-meta.component';
import { ArticlePreviewComponent } from './articles/article-preview/article-preview.component';
import { FavoriteComponent } from './buttons/favorite/favorite.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
  declarations: [
    FollowComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    FavoriteComponent,
    ArticleListComponent,
    ShowAuthedDirective,
    ListErrorsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    FollowComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    FavoriteComponent,
    ArticleListComponent,
    ShowAuthedDirective,
    ListErrorsComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ListErrorsComponent,
    RouterModule,
  ],
})
export class SharedModule {}
