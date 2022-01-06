/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { DatetimeService } from './datetime.service';

describe('Service: Datetime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatetimeService]
    });
  });

  it('should ...', inject([DatetimeService], (service: DatetimeService) => {
    expect(service).toBeTruthy();
  }));
});
