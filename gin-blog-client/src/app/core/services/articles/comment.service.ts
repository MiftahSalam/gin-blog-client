import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../../models/articles/comment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  add(slug: string, comment: string): Observable<Comment> {
    return this.apiService
      .post(`article/${slug}/comment`, { comment: { body: comment } })
      .pipe(map((data) => data?.comment));
  }

  getAll(slug: string): Observable<Comment[]> {
    return this.apiService
      .get(`article/${slug}/comments`)
      .pipe(map((data) => data.comments));
  }

  destroy(slug: string, commentId: number) {
    return this.apiService.delete(`article/${slug}/comment/${commentId}`);
  }
}
