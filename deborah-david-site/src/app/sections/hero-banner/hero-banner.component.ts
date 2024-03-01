import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {
  titles: string[] = [
    'John Maxwell Certified Coach',
    'Public Speaker',
    'Author',
    'Social & Emotional Intelligence Trainer'
  ];

  constructor(private router: Router) { }

  redirectToAbout(): void {
    this.router.navigate(['/about']);
  }
}
