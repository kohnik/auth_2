import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltoCreateCardComponent } from './modalto-create-card.component';

describe('ModaltoCreateCardComponent', () => {
  let component: ModaltoCreateCardComponent;
  let fixture: ComponentFixture<ModaltoCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaltoCreateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltoCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
