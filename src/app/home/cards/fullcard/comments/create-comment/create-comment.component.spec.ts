import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CreateCommentComponent } from './create-comment.component';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { SwithThemeService } from '../../../../../core/services/switchTheme/swith-theme.service';
import { dataOfCardForUnitTest } from '../../../../../shared/constants';

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;
  const fakeAuthService: AuthService = jasmine.createSpyObj('AuthService', [
    'getAuthInstance',
    'checkAuth',
  ]);
  const fakeThemeService: SwithThemeService = jasmine.createSpyObj(
    'AuthService',
    ['changeTheme']
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCommentComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: SwithThemeService,
          useValue: fakeThemeService,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CreateCommentComponent);
        component = fixture.componentInstance;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('button should close divInput for new comment', () => {
    const event = spyOn(component.closeToCreate, 'emit');
    component.closeForCreateComment();
    expect(event).toHaveBeenCalled();
  });

  it('button should close divInput for new comment', fakeAsync(() => {
    spyOn(component, 'addAnswer');
    const btn = fixture.debugElement.query(By.css('.btn.btn-outline-success'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(component.addAnswer).toHaveBeenCalled();
    fixture.detectChanges();
  }));

  it('component input card is not undefined ', fakeAsync(() => {
    component.item = dataOfCardForUnitTest;
    expect(component.item).toBeDefined();
  }));
});
