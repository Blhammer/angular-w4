import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-emergency-button',
  imports: [CommonModule],
  templateUrl: './emergency-button.component.html',
  styleUrls: ['./emergency-button.component.css'],
  standalone: true,
})
export class EmergencyButtonComponent {
  public isEmergency: boolean = false;
  public isDisabled: boolean = false;
  private emergencySubscription: Subscription | null = null;
  private disableSubscription: Subscription | null = null;

  onEmergency(): void {
    if (!this.isDisabled) {
      this.isEmergency = true;
      this.isDisabled = true;

      this.emergencySubscription = interval(10000).subscribe(() => {
        this.isEmergency = false;
        if (this.emergencySubscription) {
          this.emergencySubscription.unsubscribe();
          this.emergencySubscription = null;
        }
      });

      this.disableSubscription = interval(20000).subscribe(() => {
        this.isDisabled = false;
        if (this.disableSubscription) {
          this.disableSubscription.unsubscribe();
          this.disableSubscription = null;
        }
      });
    }
  }
}
