import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ArticleService } from "../../services/article.service";
import { Article } from "../../models/article.model";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article = null;
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticle('cow-says')
      .subscribe((response: Response) => {
        this.article = response.json();
      })
  }

}
