import { Injectable } from '@angular/core';
import { IClockingResponse } from '../shared/models/clocking.type';
import { Observable } from 'rxjs';
import { MockClockingData } from '../../assets/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor() { }

  fetchReportData(): Observable<IClockingResponse[]> {
    // Implement data fetching logic here
    return new Observable<IClockingResponse[]>(subscriber => {
      // Simulate async data fetching
      setTimeout(() => {
        subscriber.next(MockClockingData); // Replace with actual data
        subscriber.complete();
      }, 2000);
    });
  }
}
