import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'ANYA ASKS PEOPLE';
  private articles: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAllArticles()
      .then((articles: Article[]) => {
        this.articles = articles;
      })
      .catch(() => {
        // TODO: if request fails show error
      });
  }

}
