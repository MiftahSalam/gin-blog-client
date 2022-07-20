import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListConfig } from '../../../core/models/articles/article-list-config';
import { Profile } from '../../../core/models/users/profile';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  profile: Profile;
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: { profile: { profile: Profile } }) => {
        // console.log('profile-component-favorites-ngOnInit data', data);
        this.profile = data.profile.profile;
        this.favoritesConfig = { ...this.favoritesConfig };
        this.favoritesConfig.filters.favorited = this.profile.username;
        this.cd.markForCheck();
      }
    );
  }
}
