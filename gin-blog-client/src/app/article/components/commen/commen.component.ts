import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from '../../../core/models/articles/comment';
import { User } from '../../../core/models/users/user';
import { UserService } from '../../../core/services/users/user.service';

@Component({
  selector: 'app-commen',
  templateUrl: './commen.component.html',
  styleUrls: ['./commen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommenComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  canModify: boolean;
  @Input() commnet: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe((data) => {
      console.log('article-components-comment NgOninit data', data);
      console.log(
        'article-components-comment NgOninit this.commnet.author',
        this.commnet.author
      );
      this.canModify = data.username === this.commnet.author.username;
      this.cd.markForCheck();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
