import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article } from '../core/models/articles/article';
import { ArticleService } from '../core/services/articles/article.service';
import { UserService } from '../core/services/users/user.service';

@Injectable({
  providedIn: 'root',
})
export class EditableArticleResolverService implements Resolve<Article> {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Article | Observable<Article> | Promise<Article> | Observable<any> {
    return this.articleService.get(route.params['slug']).pipe(
      map((article) => {
        if (
          this.userService.getCurrentUser().username === article.author.username
        ) {
          return article;
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      catchError((err) => this.router.navigateByUrl('/'))
    );
  }
}
