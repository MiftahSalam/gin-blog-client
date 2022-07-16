import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { User } from '../../core/models/users/user';
import { Errors } from '../../core/models/errors';
import { Article } from '../../core/models/articles/article';
import { Comment } from '../../core/models/articles/comment';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../core/services/articles/article.service';
import { CommentService } from '../../core/services/articles/comment.service';
import { UserService } from '../../core/services/users/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePage implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors: Errors = { errors: {} };
  isSubmitting = false;
  isDeleteing = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { article: Article }) => {
      // console.log('article-pages-NgOninit data', data);
      this.article = data.article;
      this.populateComments();
      this.cd.markForCheck();
    });

    this.userService.currentUser.subscribe((data: User) => {
      this.currentUser = data;
      this.canModify =
        this.currentUser.username === this.article.author.username;
      this.cd.markForCheck();
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;
    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
      if (this.article.favoritesCount < 0) {
        this.article.favoritesCount = 0;
      }
    }
  }

  trackBy(index: number, name: any): number {
    return index;
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleteing = true;
    this.articleService
      .destroy(this.article.slug)
      .subscribe((success) => this.router.navigateByUrl('/'));
  }

  populateComments() {
    this.commentService.getAll(this.article.slug).subscribe((data) => {
      this.comments = data;
      this.cd.markForCheck();
    });
  }

  addComment() {
    const commentBody = this.commentControl.value;
    this.isSubmitting = true;
    this.commentFormErrors = { errors: {} };

    this.commentService.add(this.article.slug, commentBody).subscribe(
      (comment) => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
        this.isSubmitting = false;
        this.cd.markForCheck();
      },
      (err) => {
        this.isSubmitting = false;
        this.commentFormErrors = err;
        this.cd.markForCheck();
      }
    );
  }

  onDeleteComment(comment: Comment) {
    this.commentService
      .destroy(this.article.slug, comment.id)
      .subscribe((success) => {
        this.comments = this.comments.filter((item) => item !== comment);
        this.cd.markForCheck();
      });
  }
}
