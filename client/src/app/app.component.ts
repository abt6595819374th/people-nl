import { Component } from '@angular/core';
import {ArticleService} from "./services/article.service";
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PPLNL';

  constructor (private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticle('cow-says')
      .subscribe((response: Response) => {
        console.log(response.json());
      })
  }
}
