import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullcardComponent } from './fullcard.component';

describe('FullcardComponent', () => {
  let component: FullcardComponent;
  let fixture: ComponentFixture<FullcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
