import { TestBed } from '@angular/core/testing';

import { SwitchViewCardsService } from './switch-view-cards.service';

describe('SwitchViewCardsService', () => {
  let service: SwitchViewCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchViewCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
