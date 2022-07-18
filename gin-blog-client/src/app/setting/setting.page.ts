import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from '../core/models/errors';
import { User } from '../core/models/users/user';
import { UserService } from '../core/services/users/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingPage implements OnInit {
  user: User;
  settingForm: FormGroup;
  errors: Errors = { errors: {} };
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.settingForm = fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    });
  }

  ngOnInit() {
    const currentUser = this.userService.getCurrentUser();
    this.user = {
      bio: '',
      email: '',
      image: '',
      token: '',
      username: '',
    };
    console.log('setting-page-ngOnInit user', currentUser);
    Object.assign(this.user, currentUser);
    this.settingForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  updateUser(values: User) {
    Object.assign(this.user, values);
  }

  submitForm() {
    this.isSubmitting = true;
    this.updateUser(this.settingForm.value);
    this.userService.update(this.user).subscribe(
      (updatedUser) =>
        this.router.navigateByUrl(`/profile/${updatedUser.username}`),
      (err) => {
        this.errors = { errors: err };
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }
}
