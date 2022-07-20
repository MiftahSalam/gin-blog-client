import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from './core/services/users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('app-componenet-ngOnInit');
    this.userService.populate();
  }
}
