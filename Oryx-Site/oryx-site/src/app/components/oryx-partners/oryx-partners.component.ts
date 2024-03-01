import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-oryx-partners',
  templateUrl: './oryx-partners.component.html',
  styleUrls: ['./oryx-partners.component.scss']
})
export class OryxPartnersComponent implements OnInit {
  isEnglish!: boolean;
  constructor(private contentfulService: ContentfulService, private languageService: LanguageService) { }

  oryxPartnerList$: Observable<any> | undefined;

  ngOnInit(): void {
    this.oryxPartnerList$ = this.contentfulService.getAllEntries('oryxPartnerList');

    this.languageService.isEnglish$.subscribe(
      (isEnglish: boolean) => {
        this.isEnglish = isEnglish;
        this.initializedPartnerList();
      },
    );
  }

  initializedPartnerList(): void {
    if (this.isEnglish) {
      this.oryxPartnerList$ = this.contentfulService.getAllEntries('oryxPartnerList');
    } else {
      this.oryxPartnerList$ = this.contentfulService.getAllEntries('oryxPartnerList', 'fr');
    }
  }
}
