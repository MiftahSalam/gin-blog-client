import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlePage } from './pages/article.page';
import { ArticleResolverService } from './services/article-resolver.service';

const routes: Routes = [
  {
    path: ':slug',
    component: ArticlePage,
    resolve: {
      article: ArticleResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlePageRoutingModule {}
