import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-client-reviews',
  templateUrl: './client-reviews.component.html',
  styleUrls: ['./client-reviews.component.scss']
})
export class ClientReviewsComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  reviewList$: Observable<any> | undefined;

  ngOnInit(): void {
    this.reviewList$ = this.contentfulService.getAllEntries('reviewList');
  }
}
