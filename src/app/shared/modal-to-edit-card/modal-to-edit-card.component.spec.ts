import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToEditCardComponent } from './modal-to-edit-card.component';

describe('ModalToEditCardComponent', () => {
  let component: ModalToEditCardComponent;
  let fixture: ComponentFixture<ModalToEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalToEditCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
