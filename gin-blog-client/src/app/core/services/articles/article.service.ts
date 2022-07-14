import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../../models/articles/article';
import { ArticleListConfig } from '../../models/articles/article-list-config';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private apiService: ApiService) {}

  query(
    config: ArticleListConfig
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    const params = {};

    Object.keys(config.filters).forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService.get(
      `article${config.type === 'feed' ? '/feed/' : '/'}`,
      new HttpParams({ fromObject: params })
    );
  }

  get(slug: string): Observable<Article> {
    return this.apiService
      .get(`article/${slug}`)
      .pipe(map((data) => data?.article));
  }

  destroy(slug: string) {
    return this.apiService.delete(`article/${slug}`);
  }

  save(article: Article): Observable<Article> {
    if (article.slug) {
      return this.apiService
        .put(`article/${article.slug}`, { article: article })
        .pipe(map((data) => data?.article));
    } else {
      return this.apiService
        .post(`article`, { article: article })
        .pipe(map((data) => data?.article));
    }
  }

  favorite(slug: string): Observable<Article> {
    return this.apiService.post(`article/${slug}/favorite`);
  }

  unfavorite(slug: string): Observable<Article> {
    return this.apiService.delete(`article/${slug}/favorite`);
  }
}
