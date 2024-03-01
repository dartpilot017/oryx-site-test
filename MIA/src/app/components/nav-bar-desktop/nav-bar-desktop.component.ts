
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { MatDialog } from '@angular/material/dialog'
import { DemoRequestButtonComponent } from 'src/app/buttons/demo-request-button/demo-request-button.component';
import { DemoRequestComponent } from '../demo-request/demo-request.component';

@Component({
  selector: 'app-nav-bar-desktop',
  templateUrl: './nav-bar-desktop.component.html',
  styleUrls: ['./nav-bar-desktop.component.scss']
})
export class NavBarDesktopComponent implements OnInit {
  dropdownContent$: Observable<any> | undefined;

  constructor(private router: Router, private contentfulservice: ContentfulService, private dialog: MatDialog) {}


  ngOnInit(): void {
    this.dropdownContent$ = this.contentfulservice.getAllEntries('dropdownContent');
  }


  openDialog() {
    this.dialog.open(DemoRequestButtonComponent);
  }

  navigateToContactUs() {
    this.router.navigate(['/contact-us']);
  }

  navigateToProductPage() {
    this.router.navigate(['/product-page']);
  }
}
