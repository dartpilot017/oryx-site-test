import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, filter, finalize } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss'],
})
export class ServicePageComponent implements OnInit {
  isEnglish!: boolean;

  constructor(
    private contentfulService: ContentfulService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private languageService: LanguageService
  ) {}

  oryxServiceList$: Observable<any> | undefined;

  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish: boolean) => {
      this.isEnglish = isEnglish;

      if (this.isEnglish) {
        this.oryxServiceList$ = this.contentfulService
          .getAllEntries('oryxServiceList')
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
      } else {
        this.oryxServiceList$ = this.contentfulService
          .getAllEntries('oryxServiceList', 'fr')
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
    });
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
}
