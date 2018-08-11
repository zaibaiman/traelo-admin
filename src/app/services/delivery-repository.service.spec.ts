import { TestBed, inject } from '@angular/core/testing';

import { DeliveryRepositoryService } from './delivery-repository.service';

describe('DeliveryRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryRepositoryService]
    });
  });

  it('should be created', inject([DeliveryRepositoryService], (service: DeliveryRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
