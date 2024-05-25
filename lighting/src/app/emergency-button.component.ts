import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { TrafficLightComponent } from './traffic-light.component';
import { SharedService } from './SharedService.component';

@Component({
  selector: 'app-emergency-button',
  imports: [CommonModule],
  templateUrl: './emergency-button.component.html',
  styleUrls: ['./emergency-button.component.css'],
  standalone: true,
})
export class EmergencyButtonComponent {
  constructor(private sharedService: SharedService) {}

  public onEmergencyActivated(): void {
    this.sharedService.triggerEmergency();
  }
}
