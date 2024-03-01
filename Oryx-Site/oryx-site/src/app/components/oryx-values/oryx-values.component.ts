import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-oryx-values',
  templateUrl: './oryx-values.component.html',
  styleUrls: ['./oryx-values.component.scss']
})
export class OryxValuesComponent {
  isEnglish!: boolean;
  constructor(private contentfulService: ContentfulService, private languageService: LanguageService) { }

  oryxValues$: Observable<any> | undefined;

  ngOnInit(): void {
    this.oryxValues$ = this.contentfulService.getAllEntries('oryxValues');

    // Language switch
    this.languageService.isEnglish$.subscribe(
      (isEnglish: boolean) => {
        this.isEnglish = isEnglish;
        this.initializeLanguage();
      }
    );
  }

  initializeLanguage(): void {
    if (this.isEnglish) {
      this.oryxValues$ = this.contentfulService.getAllEntries('oryxValues');
    } else {
      this.oryxValues$ = this.contentfulService.getAllEntries('oryxValues', 'fr');
    }
  }
}
