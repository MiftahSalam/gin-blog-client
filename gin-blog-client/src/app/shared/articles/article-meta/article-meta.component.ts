import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Article } from '../../../core/models/articles/article';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleMetaComponent implements OnInit {
  @Input() article: Article;

  constructor() {}

  ngOnInit() {}
}
