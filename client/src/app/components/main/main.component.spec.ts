/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleService } from '../../services/article.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { Article } from '../../models/article.model';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mockArticle: Article = new Article();
  mockArticle.title = 'Cow';
  mockArticle.url = 'cow-says';
  mockArticle.text = 'mooo';
  let mockArticles: Article[] = [
    mockArticle,
    mockArticle
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        ArticleService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            backendInstance.connections.subscribe( c => {
              if (c.request.url === '/api/article/') {
                let res = new Response( new ResponseOptions({
                  body: JSON.stringify(mockArticles)
                }));

                c.mockRespond(res);
              }
            });

            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
