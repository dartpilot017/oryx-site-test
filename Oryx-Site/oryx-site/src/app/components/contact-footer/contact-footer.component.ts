import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-contact-footer',
  templateUrl: './contact-footer.component.html',
  styleUrls: ['./contact-footer.component.scss']
})
export class ContactFooterComponent implements OnInit {
  constructor(private contentfulService: ContentfulService, private languageService: LanguageService) { }

  oryxContacts$: Observable<any> | undefined;
  isEnglish! : boolean;

  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe(
      (isEnglish: boolean) => {
        this.isEnglish = isEnglish;
        if (this.isEnglish) {
          this.oryxContacts$ = this.contentfulService.getAllEntries('oryxContacts');
        } else {
          this.oryxContacts$ = this.contentfulService.getAllEntries('oryxContacts', 'fr');
        }
      }
    );
    
  }
}
