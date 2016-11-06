import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ArticleService {
  private apiAddress = '/api/article/';  // URL to web API

  constructor (private http: Http) {}
  getArticle (articleUrl: String): Observable<Object> {
    return this.http.get(this.apiAddress + articleUrl);
      /*.map(this.extractData)
      .catch(this.handleError);*/
  }

}
