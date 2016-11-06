import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ArticleService} from "./services/article.service";
import { ArticleComponent } from './components/article/article.component';
import { RouterModule } from "@angular/router";
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'article/:url',
        component: ArticleComponent
      },
      {
        path: '',
        component: MainComponent
      },
    ])
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
