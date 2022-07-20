import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleListConfig } from '../../../core/models/articles/article-list-config';
import { Profile } from '../../../core/models/users/profile';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  profile: Profile;
  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: { profile: { profile: Profile } }) => {
        // console.log('profile-component-article-ngOnInit data', data);
        this.profile = data.profile.profile;
        this.articlesConfig = {
          type: 'all',
          filters: {},
        };
        this.articlesConfig.filters.author = this.profile.username;
        this.cd.markForCheck();
      }
    );
  }
}
