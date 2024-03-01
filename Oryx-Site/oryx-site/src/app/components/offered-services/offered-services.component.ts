import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-offered-services',
  templateUrl: './offered-services.component.html',
  styleUrls: ['./offered-services.component.scss']
})
export class OfferedServicesComponent implements OnInit {
  isEnglish!: boolean;
  constructor(private contentfulService: ContentfulService, private languageService: LanguageService) { }

  offeredServices$: Observable<any> | undefined;

  ngOnInit(): void {
    this.offeredServices$ = this.contentfulService.getAllEntries('offeredServices');

    this.languageService.isEnglish$.subscribe(
      (isEnglish: boolean) => {
        this.isEnglish = isEnglish;
        this.initializeLanguage();
      }
    );
  }

  initializeLanguage(): void {
    if (this.isEnglish) {
      this.offeredServices$ = this.contentfulService.getAllEntries('offeredServices');
    } else {
      this.offeredServices$ = this.contentfulService.getAllEntries('offeredServices', 'fr');
    }
  }
}
