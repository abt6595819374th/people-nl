import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
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
      .then((article: Article) => {
        this.article = article;
      })
      .catch(() => {
        // TODO: if request fails show error
      });
  }

}
