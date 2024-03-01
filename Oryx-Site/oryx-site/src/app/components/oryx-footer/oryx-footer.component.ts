import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-oryx-footer',
  templateUrl: './oryx-footer.component.html',
  styleUrls: ['./oryx-footer.component.scss']
})
export class OryxFooterComponent implements OnInit {

  isEnglish!: boolean;

  constructor(private contentfulService: ContentfulService, private languageService: LanguageService) { }

  oryxFooter$: Observable<any> | undefined;

  ngOnInit(): void {
    this.oryxFooter$ = this.contentfulService.getAllEntries('oryxFooter');

    this.languageService.isEnglish$.subscribe((isEnglish: boolean) => {
      this.isEnglish = isEnglish;
      this.initializeLanguage();
    });
  }

  initializeLanguage(): void {
    if (this.isEnglish) {
      this.oryxFooter$ = this.contentfulService.getAllEntries('oryxFooter');
    } else {
      this.oryxFooter$ = this.contentfulService.getAllEntries('oryxFooter', 'fr')
    }
  }
}
