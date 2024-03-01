import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-request-button',
  templateUrl: './demo-request-button.component.html',
  styleUrls: ['./demo-request-button.component.scss']
})
export class DemoRequestButtonComponent {
  isPopUpVisible = true;

  closeContainer() {
    this.isPopUpVisible = false;
  }
}