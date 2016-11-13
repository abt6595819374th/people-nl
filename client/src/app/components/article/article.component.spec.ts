/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { ArticleService } from '../../services/article.service';
import { Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';


describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let mockArticle: Article = new Article();
  mockArticle.title = 'Cow';
  mockArticle.text = 'mooo';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      providers: [
        ArticleService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            backendInstance.connections.subscribe( c => {
              if (c.request.url === '/api/article/cow-says') {
                let res = new Response( new ResponseOptions({
                  body: JSON.stringify(mockArticle)
                }));

                c.mockRespond(res);
              }
            });

            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.from([{ url: 'cow-says' }])
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate without errors', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', function () {
    it('should load article on initialization', (done) => {
      fixture.whenStable().then(() => {
        expect(component.article.title).toBe('Cow');
        expect(component.article.text).toBe('mooo');
        done();
      });
    });

    it('should render title in a h1 tag', (done) => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Cow');
        done();
      });
    });

    it('should render article content in a .text div', (done) => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.text').textContent).toContain('mooo');
        done();
      });
    });
  });
});
