import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../core/models/articles/article';
import { Errors } from '../core/models/errors';
import { ArticleService } from '../core/services/articles/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPage implements OnInit {
  article: Article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Errors = { errors: {} };
  isSubmitting = false;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.articleForm = fb.group({
      title: '',
      description: '',
      body: '',
    });

    this.article.tagList = [];
  }

  ngOnInit() {
    this.route.data.subscribe((data: { article: Article }) => {
      // console.log('editor-page NgOninit data', data);
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
        this.cd.markForCheck();
      }
    });
  }

  trackBy(index: number, name): number {
    return index;
  }

  addTag() {
    const tag = this.tagField.value;
    // console.log('editor-page-addTag tag', tag);
    // console.log('editor-page-addTag tagList', this.article.tagList);
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }

    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(
      (tag) => tag !== tagName
    );
    // console.log('editor-page-removeTag tag remove', tagName);
    // console.log('editor-page-removeTag new tagList', this.article.tagList);
  }

  submitForm() {
    this.isSubmitting = true;
    this.updateArticle(this.articleForm.value);
    this.articleService.save(this.article).subscribe(
      (article) => {
        this.router.navigateByUrl('/article/' + article.slug);
        this.cd.markForCheck();
      },
      (err) => {
        this.errors = { errors: err };
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }

  updateArticle(values) {
    Object.assign(this.article, values);
  }
}
