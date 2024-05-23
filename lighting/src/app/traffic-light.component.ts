import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  imports: [CommonModule],
  styleUrls: ['./traffic-light.component.css'],
  standalone: true,
})
export class TrafficLightComponent implements OnInit, OnDestroy {
  @Input() position: 'horizontal' | 'vertical' = 'horizontal';
  public currentColor: 'red' | 'yellow' | 'green' = 'red';
  private timerSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.startCycle();
  }

  startCycle(): void {
    const redDuration = 5000;
    const yellowDuration = 2000;
    const greenDuration = 5000;

    const cycle$ = interval(
      redDuration + yellowDuration + greenDuration
    ).subscribe(() => {
      this.currentColor = 'red';
      setTimeout(() => (this.currentColor = 'yellow'), redDuration);
      setTimeout(
        () => (this.currentColor = 'green'),
        redDuration + yellowDuration
      );
    });

    this.timerSubscription = cycle$;
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  onCross() {
    if (this.currentColor === 'yellow') {
      alert('Неправилно пресичане');
    }
  }
}
