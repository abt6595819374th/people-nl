/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';

describe('Service: Article', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
    });
  });

  it('should ...', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));
});
