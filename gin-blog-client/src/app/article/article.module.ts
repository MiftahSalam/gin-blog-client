import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlePageRoutingModule } from './article-routing.module';

import { ArticlePage } from './pages/article.page';
import { SharedModule } from '../shared/shared.module';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { CommenComponent } from './components/commen/commen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlePageRoutingModule,
    SharedModule,
  ],
  declarations: [ArticlePage, MarkdownPipe, CommenComponent],
})
export class ArticlePageModule {}
