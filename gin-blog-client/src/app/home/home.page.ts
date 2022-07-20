import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ArticleListConfig } from '../core/models/articles/article-list-config';
import { TagService } from '../core/services/articles/tag.service';
import { UserService } from '../core/services/users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };
  tags: Array<string> = [];
  tagsLoaded = false;

  constructor(
    private router: Router,
    private tagsService: TagService,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;

      if (authenticated) {
        this.setListTo('feed');
      } else {
        this.setListTo('all');
      }

      this.cd.markForCheck();
    });

    this.tagsService.getAll().subscribe((tags) => {
      this.tags = tags;
      this.tagsLoaded = true;
      this.cd.markForCheck();
    });
  }

  trackByFn(index, item) {
    return index;
  }

  setListTo(type: string = '', filters = {}) {
    this.updateAuth();
    console.log('home-page-setListTo type', type);
    console.log('home-page-setListTo isAuthenticated', this.isAuthenticated);

    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listConfig = { type, filters };
  }

  updateAuth() {
    console.log('home-page-updateAuth');
    this.userService.checkAuth();
    this.userService.isAuthenticated.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }
}
