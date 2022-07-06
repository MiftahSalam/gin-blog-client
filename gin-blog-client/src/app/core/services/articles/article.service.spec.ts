import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Article } from '../../models/articles/article';

import { ArticleService } from './article.service';

const articlesMock: Article[] = [
  {
    author: {
      bio: 'bio',
      following: false,
      image: 'image',
      username: 'alif',
    },
    body: 'test',
    createdAt: 'now',
    description: 'desc',
    favorited: true,
    favoritesCount: 1,
    slug: 'article-1',
    tagList: ['test'],
    title: 'Article 1',
    updatedAt: 'later',
  },
];

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should get article with author miftah', () => {
      service
        .query({
          type: 'feed',
          filters: { author: articlesMock[0].author.username },
        })
        .subscribe((value) => {
          console.log('value', value);
          expect(value).toEqual({ articles: articlesMock, articlesCount: 1 });
        });

      const req = httpMock.expectOne(
        `${environment.apiUrl}/article/feed?author=${articlesMock[0].author.username}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ articles: articlesMock, articlesCount: 1 });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
