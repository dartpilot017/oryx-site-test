import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-oryx-clients-slider',
  templateUrl: './oryx-clients-slider.component.html',
  styleUrls: ['./oryx-clients-slider.component.scss']
})
export class OryxClientsSliderComponent implements OnInit {
  isEnglish!: boolean;

  constructor(private contentfulService: ContentfulService, private languageService: LanguageService) { }

  oryxClientList$: Observable<any> | undefined;

  ngOnInit(): void {
    this.oryxClientList$ = this.contentfulService.getAllEntries('oryxClientList');

    this.languageService.isEnglish$.subscribe(
      (isEnglish: boolean) => {
        this.isEnglish = isEnglish;
        this.initializeLanguage();
      }
    );
  }

  initializeLanguage(): void {
    if (this.isEnglish) {
      this.oryxClientList$ = this.contentfulService.getAllEntries('oryxClientList');
    } else {
      this.oryxClientList$ = this.contentfulService.getAllEntries('oryxClientList', 'fr');
    }}

  @ViewChild('slider') sliderRef!: ElementRef;

  scrollDistance: number = 200;

  scrollLeft() {
    this.sliderRef.nativeElement.scrollTo({
      left: this.sliderRef.nativeElement.scrollLeft - this.scrollDistance,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.sliderRef.nativeElement.scrollTo({
      left: this.sliderRef.nativeElement.scrollLeft + this.scrollDistance,
      behavior: 'smooth'
    });
  }
}
