import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-desktop',
  templateUrl: './nav-bar-desktop.component.html',
  styleUrls: ['./nav-bar-desktop.component.scss']
})
export class NavBarDesktopComponent {
  constructor(private router: Router) {}

  isCompanyActive(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/ddc' || currentRoute === '/ddcllc';
  }
}
