import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-featured-book',
  templateUrl: './featured-book.component.html',
  styleUrls: ['./featured-book.component.scss']
})
export class FeaturedBookComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  featuredBook$: Observable<any> | undefined;

  ngOnInit(): void {
    this.featuredBook$ = this.contentfulService.getAllEntries('featuredBook');
  }
}
