import { TestBed } from '@angular/core/testing';

import { FiltersCardsService } from './filters-cards.service';

describe('FiltersCardsService', () => {
  let service: FiltersCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
