import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.scss']
})
export class NavBarMobileComponent {
  navItems: { name: string, route: string }[] = [
    {name: 'Home', route: '/home'},
    {name: 'About', route: '/about'},
    {name: 'Expressions', route: '/expressions'},
    {name: 'DDC', route: '/ddc'},
    {name: 'DDCLLC', route: '/ddcllc'},
    {name: 'Books', route: '/books'},
    {name: 'Media', route: '/media'},
    {name: 'Blog', route: '/blogs'},
    {name: 'Contact', route: '/contact'}
  ]

  isNavbarOpen: boolean = false;
  toggleNavbar() { this.isNavbarOpen = !this.isNavbarOpen; }
}
