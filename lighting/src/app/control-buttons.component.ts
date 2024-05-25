import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: [],
  standalone: true,
})
export class ControlButtonsComponent {
  @Input() lightColor: 'red' | 'yellow' | 'green' = 'red';

  isCrossButtonDisabled(): boolean {
    return this.lightColor === 'red';
  }

  onCross(): void {
    if (this.lightColor === 'yellow') {
      alert('Неправилно пресичане');
    }
  }
}
