import { TestBed, inject } from '@angular/core/testing';

import { SalesOrderRepositoryService } from './sales-order-repository.service';

describe('SalesOrderRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesOrderRepositoryService]
    });
  });

  it('should be created', inject([SalesOrderRepositoryService], (service: SalesOrderRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
