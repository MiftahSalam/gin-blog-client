import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/users/user';
import { UserService } from '../../../core/services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.cd.markForCheck();
    });
  }
}
