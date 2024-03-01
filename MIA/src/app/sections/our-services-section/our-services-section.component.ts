import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, finalize } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-our-services-section',
  templateUrl: './our-services-section.component.html',
  styleUrls: ['./our-services-section.component.scss'],
})
export class OurServicesSectionComponent implements OnInit {
  cardColors = ['#8CC23F', '#F26A21', '#FFC60A', '#07181F', '#27AEE5'];

  constructor(
    private contentfulservice: ContentfulService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  serviceCardSection$: Observable<any> | undefined;

  ngOnInit(): void {
    this.serviceCardSection$ = this.contentfulservice
      .getAllEntries('serviceCardSection')
      .pipe(
        finalize(() => {
          this.route.fragment
            .pipe(filter((fragment) => !!fragment))
            .subscribe((fragment) => {
              setTimeout(() => this.scrollToFragment(fragment), 0);
            });

          this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
              const fragment = this.route.snapshot.fragment;
              if (fragment) {
                setTimeout(() => this.scrollToFragment(fragment), 0);
              }
            });
        })
      );
  }

  scrollToFragment(fragment: string | null): void {
    const element = this.elementRef.nativeElement.querySelector(`#${fragment}`);
    if (element) {
      const paddingTop = 130; // Adjust this value to set the desired top padding in pixels
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - paddingTop;

      this.renderer.setStyle(document.body, 'scrollBehavior', 'smooth');
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      this.renderer.removeStyle(document.body, 'scrollBehavior');
    }
  }

  isWhiteText(color: string): boolean {
    const whiteTextColors = ['#8CC23F', '#F26A21', '#07181F', '#27AEE5'];
    return whiteTextColors.includes(color);
  }

  navigateToContactUs() {
    this.router.navigate(['/contact-us']);
  }
}
