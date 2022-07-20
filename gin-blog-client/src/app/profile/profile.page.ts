import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { Profile } from '../core/models/users/profile';
import { User } from '../core/models/users/user';
import { UserService } from '../core/services/users/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: Profile;
  currentUser: User;
  isUser: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        concatMap((data: { profile: { profile: Profile } }) => {
          // console.log('profile-page-ngOnInit data', data);
          this.profile = data.profile.profile;
          return this.userService.currentUser.pipe(
            tap((user: User) => {
              this.currentUser = user;
              this.isUser = this.currentUser.username === this.profile.username;
            })
          );
        })
      )
      .subscribe(() => this.cd.markForCheck());
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
