import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { EditableArticleResolverService } from './editable-article-resolver.service';

import { EditorPage } from './editor.page';

const routes: Routes = [
  {
    path: '',
    component: EditorPage,
    canActivate: [AuthGuard],
  },
  {
    path: ':slug',
    component: EditorPage,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorPageRoutingModule {}
