import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarsService } from './cars.service';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
