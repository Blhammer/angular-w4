import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private emergencySubject = new Subject<void>();

  triggerEmergency() {
    this.emergencySubject.next();
  }

  getEmergencyTrigger(): Observable<void> {
    return this.emergencySubject.asObservable();
  }
}
