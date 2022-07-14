import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from '../core/models/errors';
import { UserService } from '../core/services/users/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPage implements OnInit {
  authType = '';
  title = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.url.subscribe((data) => {
      this.authType = data[data.length - 1].path;
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    const credential = this.authForm.value;
    this.isSubmitting = true;
    this.errors = { errors: {} };

    this.userService.attempAuth(this.authType, credential).subscribe(
      (data) => this.router.navigateByUrl('/'),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }
}
