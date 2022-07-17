import { TestBed } from '@angular/core/testing';

import { EditableArticleResolverService } from './editable-article-resolver.service';

describe('EditableArticleResolverService', () => {
  let service: EditableArticleResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditableArticleResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
