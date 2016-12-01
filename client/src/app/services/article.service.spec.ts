/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { Article } from '../models/article.model';

describe('Service: Article', () => {
  let service: ArticleService;
  let mockArticle: Article = new Article();
  mockArticle.title = 'Cow';
  mockArticle.text = 'mooo';

  let mockArticles: Article[] = [
    mockArticle,
    mockArticle
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
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
              } else if (c.request.url === '/api/article/cow-says') {
                let res = new Response( new ResponseOptions({
                  body: JSON.stringify(mockArticle)
                }));

                c.mockRespond(res);
              } else if (c.request.url === '/api/article/cow-says--emulate-500') {
                let res = new Response( new ResponseOptions({
                  status: 500
                }));

                c.mockError(res);
              } else if (c.request.url === '/api/article/cow-says--emulate-exception') {
                c.mockError(new Error('Emulated unexpected error'));
              }
            });

            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
    });

    service = TestBed.get(ArticleService);
  });

  it('should instantiate without errors', () => {
    expect(service).toBeTruthy();
  });

  describe('getArticle()', () => {
    it('should load requested article', (done) => {
      service.getArticle('cow-says')
        .then((data: Article) => {
          expect(data.title).toBe('Cow');
          expect(data.text).toBe('mooo');
          done();
        });
      }
    );

    it('should return 500 error', (done) => {
      service.getArticle('cow-says--emulate-500')
        .catch((error) => {
          expect(error.status).toBe(500);
          done();
        });
      }
    );

    it('should return error message', (done) => {
      service.getArticle('cow-says--emulate-exception')
        .catch((error: Error) => {
          expect(error.message).toBe('Emulated unexpected error');
          done();
        });
      }
    );
  });

  describe('getArticles()', () => {
    it('should load requested article', (done) => {
      service.getAllArticles()
        .then((data: Article[]) => {
          expect(data[0].title).toBe('Cow');
          done();
        });
      }
    );
/*
    it('should return 500 error', (done) => {
      service.getAllArticles()
        .catch((error) => {
          expect(error.status).toBe(500);
          done();
        });
      }
    );

    it('should return error message', (done) => {
      service.getAllArticles('cow-says--emulate-exception')
        .catch((error: Error) => {
          expect(error.message).toBe('Emulated unexpected error');
          done();
        });
      }
    );*/
  });

});
