import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-popular-sayings',
  templateUrl: './popular-sayings.component.html',
  styleUrls: ['./popular-sayings.component.scss']
})
export class PopularSayingsComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  popularSayings$: Observable<any> | undefined;
  displayedSayings: string[] = [];
  noMoreSayings: boolean = false;
  n: number = 6;

  ngOnInit(): void {
    this.popularSayings$ = this.contentfulService.getAllEntries('popularSayings');
    this.initializePopularSayings();
  }

  initializePopularSayings(): void {
    this.popularSayings$?.subscribe((sayings: any) => {
      if (this.n > sayings['items'][0]['fields']['quoteImages'].length) {
        this.noMoreSayings = true;
        return;
      }
      let count: number = 0;
      this.displayedSayings = [];
      sayings['items'][0]['fields']['quoteImages'].forEach((item: any) => {
        if (count >= this.n || this.noMoreSayings) { return; }
        this.displayedSayings.push(item['fields']['file']['url']);
        count++;
      });
    });
  }

  loadMoreSayings(): void {
    if (this.noMoreSayings) { return; }
    this.n += 3;
    this.initializePopularSayings();
  }

}
