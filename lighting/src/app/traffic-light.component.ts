import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './SharedService.component';

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  imports: [CommonModule],
  styleUrls: ['./traffic-light.component.css'],
  standalone: true,
})
export class TrafficLightComponent implements OnInit, OnDestroy {
  @Input() position: 'horizontal' | 'vertical' = 'horizontal';
  public currentColor: 'red' | 'yellow' | 'green' | 'none' = 'none';
  private emergencySubscription: Subscription | null = null;
  private isYellowVisible: boolean = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.startCycle();
    this.emergencySubscription = this.sharedService
      .getEmergencyTrigger()
      .subscribe(() => {
        this.initiateEmergency();
      });
  }

  public ngOnDestroy(): void {
    if (this.emergencySubscription) {
      this.emergencySubscription.unsubscribe();
    }
  }

  private startCycle(): void {
    const redDuration = 5000;
    const yellowDuration = 2000;
    const greenDuration = 5000;

    this.currentColor = 'none';

    setTimeout(() => {
      this.currentColor = 'yellow';
      setTimeout(() => {
        this.currentColor = 'green';
        setTimeout(() => {
          this.currentColor = 'yellow';
          setTimeout(() => {
            this.currentColor = 'red';
          }, yellowDuration);
        }, greenDuration);
      }, yellowDuration);
    }, redDuration);
  }

  private stopCycle(): void {
    this.currentColor = 'none';
  }

  public onCross() {
    if (this.currentColor === 'yellow') {
      alert('Неправилно пресичане');
    }
  }

  public initiateEmergency(): void {
    this.stopCycle();
    const blinkDuration = 1000;
    const totalDuration = 10000;

    let elapsedTime = 0;

    const blinkInterval = setInterval(() => {
      if (this.isYellowVisible) {
        this.currentColor = 'none';
      } else {
        this.currentColor = 'yellow';
      }
      this.isYellowVisible = !this.isYellowVisible;
      elapsedTime += blinkDuration;

      if (elapsedTime >= totalDuration) {
        clearInterval(blinkInterval);
        this.currentColor = 'none';
      }
    }, blinkDuration);

    this.startCycle();
  }
}
