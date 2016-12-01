import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Article } from '../models/article.model';

@Injectable()
export class ArticleService {
  private apiAddress = '/api/article/';  // URL to web API

  constructor(private http: Http) {
  }

  getArticle(articleUrl: String): Promise<Article> {
    return this.http.get(this.apiAddress + articleUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getAllArticles(): Promise<Article[]> {
    return this.http.get(this.apiAddress)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    return Promise.reject(error);
  }

}
