import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DemoRequestButtonComponent } from 'src/app/buttons/demo-request-button/demo-request-button.component';

@Component({
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.scss'],
})
export class NavBarMobileComponent {
  navItems: { name: string; route?: string; action?: () => void }[] = [
    { name: 'Home', route: '/home' },
    { name: 'Service', route: '/service', action: () => this.openService() },
    { name: 'Product', route: '/product', action: () => this.openProducts() },
    { name: 'Request Demo', action: () => this.openMobileDemoRequest() },
    { name: 'Contact', route: '/contact-us' },
    { name: 'Blog', route: '/blog' },
  ];
  serviceItems: { name: string; route?: string; action?: () => void }[] = [
    { name: 'Business Consultancy', route: '/business-consultancy' },
    { name: 'Professional Services', route: '/professional-services' },
    {
      name: 'Enterprise Resource Planning (ERP) Solutions',
      route: '/erp-solutions',
    },
    { name: 'HR and Payroll Solutions', route: '/hrp-and-payroll-solutions' },
    { name: 'Application Development', route: '/application-development' },
  ];
  productItems: { name: string; route?: string; action?: () => void }[] = [
    { name: 'Oryx HR Product', route: '/oryx-hr' },
    { name: ' School Pick-Up Product', route: '/school-pickUp' },
  ];

  isNavbarOpen: boolean = false;
  isServiceOpen: boolean = false;
  isProductOpen: boolean = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  openService() {
    this.isServiceOpen = !this.isServiceOpen;
  }
  openProducts() {
    this.isProductOpen = !this.isProductOpen;
  }

  openMobileDemoRequest() {
    // Open the demo request dialog for mobile
    this.dialog.open(DemoRequestButtonComponent);
  }

  handleNavItemAction(item: {
    name: string;
    route?: string;
    action?: () => void;
  }) {
    if (item.action) {
      // Call the action if defined
      item.action();
      // Close the mobile navigation after the action (optional)
      this.isNavbarOpen = false;
    } else if (item.route) {
      // Navigate to the route if defined
      this.router.navigate([item.route]);
      // Close the mobile navigation after navigating (optional)
      this.isNavbarOpen = false;
      this.isServiceOpen = false;
      this.isProductOpen = false;
    }
  }
}
