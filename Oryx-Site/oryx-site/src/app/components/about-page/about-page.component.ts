import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  isEnglish!: boolean;
  constructor(
    private contentfulService: ContentfulService,
    private languageService: LanguageService
  ) {}

  oryxAboutPage$: Observable<any> | undefined;

  ngOnInit(): void {
    this.oryxAboutPage$ = this.contentfulService.getAllEntries('aboutPage');

    this.languageService.isEnglish$.subscribe((isEnglish: boolean) => {
      this.isEnglish = isEnglish;
      this.initializeLanguage();
    });
  }

  initializeLanguage(): void {
    if (this.isEnglish) {
      this.oryxAboutPage$ = this.contentfulService.getAllEntries('aboutPage');
    } else {
      this.oryxAboutPage$ = this.contentfulService.getAllEntries(
        'aboutPage',
        'fr'
      );
    }
  }
}
