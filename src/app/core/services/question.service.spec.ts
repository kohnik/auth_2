import {  TestBed,  } from '@angular/core/testing';
import { QuestionService } from './question.service';
import {
  HttpClientModule,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import {
  dataOfCardForUnitTest,
  dataOfAllCardForUnitTest,
  request,
  dataOfComment,
} from '../../shared/constants';

describe('FireDatabaseService', () => {
  let service: QuestionService;
  let authStub: AuthService = jasmine.createSpyObj('AuthService', [
    'getAuthInstance',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        HttpTestingController,
        QuestionService,
        {
          provide: AuthService,
          useValue: authStub,
        },
      ],
    });
    service = TestBed.get(QuestionService);
    authStub = TestBed.get(AuthService);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all questions', () => {
    service.getAll().subscribe((posts) => {
      expect(posts).toEqual(dataOfAllCardForUnitTest);
    });
  });
  it('should get question', () => {
    service.getCard('-mdfdsfsdfds').subscribe((post) => {
      expect(post).toEqual(dataOfCardForUnitTest);
    });
  });
  it('should delete question', () => {
    service
      .deleteQuestion('-M_qaAZ6b0TntBfYmCOC')
      .subscribe((deleteQuestion) => {
        console.log(deleteQuestion);
        expect(deleteQuestion).toEqual(request);
      });
  });

  it('should edit question', () => {
    service
      .postEditQuestion('-M_qaAZ6b0TntBfYmCOC', dataOfCardForUnitTest)
      .subscribe((postEditQuestion) => {
        expect(postEditQuestion).toEqual(request);
      });
  });

  it('should approve question', () => {
    service
      .approveQuestion('-M_qaAZ6b0TntBfsdfsdfYmCOC', dataOfCardForUnitTest)
      .subscribe((approveQuestion) => {
        expect(approveQuestion).toEqual(request);
      });
  });
  it('should approve comment', () => {
    service
      .approveComment(
        '-M_qaAZ6b0TntBfYmCOC',
        '-M_qaAZ6b0TntBfYmCOC',
        dataOfCardForUnitTest,
        dataOfComment
      )
      .subscribe((approveQuestion) => {
        expect(approveQuestion).toEqual(request);
      });
  });
  it('should add comment', () => {
    service
      .addComment('-M_qaAZ6b0TntBfYmCOC', dataOfComment)
      .subscribe((approveQuestion) => {
        expect(approveQuestion).toEqual(request);
      });
  });
});
