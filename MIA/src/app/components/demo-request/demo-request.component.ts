import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demo-request',
  templateUrl: './demo-request.component.html',
  styleUrls: ['./demo-request.component.scss']
})
export class DemoRequestComponent {
  isDemoRequestVisible = true;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  demo = [
    { demos: 'Work seamlessly, anywhere, anytime' },
    { demos: 'Connect your entire organization and achieve clear goals' },
    { demos: 'Eliminate meetings for more focus time' },
    { demos: 'Spend more time on actual work' }
  ];

  submitForm(): void {
    this.formSubmitted.emit();
  }

  closeForm() {
    this.isDemoRequestVisible = false;
  }
}
