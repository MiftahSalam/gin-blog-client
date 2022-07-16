import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ArticleService } from '../../core/services/articles/article.service';
import { Article } from '../../core/models/articles/article';
// import { UserService } from '../../core/services/users/user.service';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolverService implements Resolve<Article> {
  constructor(
    private articleService: ArticleService,
    private router: Router
  ) // private userService: UserService
  {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Article | Observable<Article> | Promise<Article> | Observable<any> {
    return this.articleService.get(route.params['slug']).pipe(
      take(1),
      catchError((err) => this.router.navigateByUrl('/'))
    );
  }
}
