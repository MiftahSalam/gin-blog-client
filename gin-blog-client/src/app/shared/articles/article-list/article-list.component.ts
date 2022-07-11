import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ArticleService } from '../../../core/services/articles/article.service';
import { Article } from '../../../core/models/articles/article';
import { ArticleListConfig } from '../../../core/models/articles/article-list-config';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  @Input() limit: number;

  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  constructor(
    private articleService: ArticleService,
    private cd: ChangeDetectorRef
  ) {}

  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  ngOnInit() {}

  setToPage(page: number) {
    this.currentPage = page;
    this.runQuery();
  }

  trackByFn(index, item) {
    return index;
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articleService.query(this.query).subscribe((data) => {
      this.loading = false;
      this.results = data.articles;
      this.totalPages = Array.from(
        new Array(Math.ceil(data.articlesCount / this.limit)),
        (val, index) => index + 1
      );
      this.cd.markForCheck();
    });
  }
}
