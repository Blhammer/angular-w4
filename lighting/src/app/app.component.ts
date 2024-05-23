import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmergencyButtonComponent } from './emergency-button.component';
import { TrafficLightComponent } from './traffic-light.component';
import { ControlButtonsComponent } from './control-buttons.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TrafficLightComponent,
    EmergencyButtonComponent,
    ControlButtonsComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lighting';
}
