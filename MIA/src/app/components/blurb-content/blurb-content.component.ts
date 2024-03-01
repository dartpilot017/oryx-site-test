import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DemoRequestButtonComponent } from 'src/app/buttons/demo-request-button/demo-request-button.component';

@Component({
  selector: 'app-blurb-content',
  templateUrl: './blurb-content.component.html',
  styleUrls: ['./blurb-content.component.scss']
})
export class BlurbContentComponent {

  constructor(private dialog: MatDialog, private router: Router) { }
  
  openDialog() {
    this.dialog.open(DemoRequestButtonComponent);
  }

  navigateToServicePage() {
    this.router.navigate(['/service']);
  }
}
