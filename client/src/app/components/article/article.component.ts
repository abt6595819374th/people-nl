import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article = null;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let url: String = params['url'];
      this.loadArticle(url);
    });
  }

  loadArticle(url: String) {
    this.articleService.getArticle(url)
      .subscribe((response: Response) => {
        this.article = response.json();
      });
  }

}
