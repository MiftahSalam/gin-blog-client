import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/users/user.service';
import { ProfileService } from '../../../core/services/users/profile.service';
import { Profile } from 'src/app/core/models/users/profile';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowComponent implements OnInit {
  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  toggleFollowing() {
    this.isSubmitting = true;
    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticed) => {
          if (!authenticed) {
            this.router.navigateByUrl('/login');
            return of(null);
          }
          if (!this.profile.following) {
            return this.profileService.follow(this.profile.username).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (err) => (this.isSubmitting = false)
              )
            );
          } else {
            return this.profileService.unfollow(this.profile.username).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                (err) => (this.isSubmitting = false)
              )
            );
          }
        })
      )
      .subscribe(() => {
        this.cd.markForCheck();
      });
  }
}
