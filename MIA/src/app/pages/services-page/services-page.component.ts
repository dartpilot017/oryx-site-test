import { NavigationEnd, Router } from '@angular/router';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ContentfulService } from 'src/app/services/contentful.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss'],
})
export class ServicesPageComponent {
  @ViewChildren('url') private url!: QueryList<ElementRef>;

  currentPath: string = 'none';
  services$: Observable<any> | undefined;
  referencedEntry$: { [key: string]: Observable<any> } = {};
  whatWeOffer: any;
  servicePageContent: any;

  constructor(
    private router: Router,
    private contentfulService: ContentfulService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentPath = event.url;
          this.fetchService();
        }
      });
  }

  fetchService() {
    this.services$ = this.contentfulService.getAllEntries('services').pipe(
      /* SERVICES PAGE ALL CONTENTS FETCH */
      map((services) => {
        const filteredItems =
          services?.items?.filter(
            (item) => item.fields['routePath'] === this.currentPath
          ) || [];
        return { ...services, items: filteredItems };
      }),
      /* SERVICE PAGE CONTENT AFTER IMAGE PLACEHOLDER FETCH */
      map((services) => {
        const contentItems = services?.items[0]?.fields?.['servicePageContent'];
        if (Array.isArray(contentItems)) {
          contentItems.forEach((content: any) => {
            if (content.fields.servicePageContent) {
              content.fields.servicePageContent.forEach(
                (servicePageContent: any) => {
                  if (
                    servicePageContent.sys &&
                    servicePageContent.sys.type === 'Link' &&
                    servicePageContent.sys.linkType === 'Entry'
                  ) {
                    const entryId = servicePageContent.sys.id;
                    if (!this.referencedEntry$[entryId]) {
                      this.referencedEntry$[entryId] =
                        this.contentfulService.getEntryById(entryId);
                    }
                  }
                }
              );
            }
          });
        }
        return services;
      }),
      /* SERVICE PAGE WHAT WE OFFER CONTENT AFTER IMAGE PLACEHOLDER FETCH */
      map((services) => {
        const contentItems = services?.items[0]?.fields?.['whatWeOffer'];
        if (Array.isArray(contentItems)) {
          contentItems.forEach((content: any) => {
            if (content.fields.whatWeOffer) {
              content.fields.whatWeOffer.forEach((whatWeOffer: any) => {
                if (
                  whatWeOffer.sys &&
                  whatWeOffer.sys.type === 'Link' &&
                  whatWeOffer.sys.linkType === 'Entry'
                ) {
                  const entryId = whatWeOffer.sys.id;
                  if (!this.referencedEntry$[entryId]) {
                    this.referencedEntry$[entryId] =
                      this.contentfulService.getEntryById(entryId);
                  }
                }
              });
            }
          });
        }
        return services;
      })
    );
  }

  fetchReferencedEntry(entry: any) {
    if (
      entry.sys &&
      entry.sys.type === 'Link' &&
      entry.sys.linkType === 'Entry'
    ) {
      const entryId = entry.sys.id;
      if (!this.referencedEntry$[entryId]) {
        this.referencedEntry$[entryId] =
          this.contentfulService.getEntryById(entryId);
      }
    }
  }

  navigateToContactUs() {
    this.router.navigate(['/contact-us']);
  }
}
