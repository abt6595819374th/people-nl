import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ArticleService {
  private articleUrl = '/api/article/cow-says';  // URL to web API

  constructor (private http: Http) {}
  getArticle (articleUrl: String): Observable<Object> {
    return this.http.get(this.articleUrl);
      /*.map(this.extractData)
      .catch(this.handleError);*/
  }

}
