import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-quote-banner',
  templateUrl: './quote-banner.component.html',
  styleUrls: ['./quote-banner.component.scss']
})
export class QuoteBannerComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  quoteBanner$: Observable<any> | undefined;

  ngOnInit(): void {
    this.quoteBanner$ = this.contentfulService.getAllEntries('quoteBanner');
  }
}
