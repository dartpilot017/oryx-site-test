import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-recent-media',
  templateUrl: './recent-media.component.html',
  styleUrls: ['./recent-media.component.scss']
})
export class RecentMediaComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  recentMediaList$: Observable<any> | undefined;

  ngOnInit(): void {
    this.recentMediaList$ = this.contentfulService.getAllEntries('recentMediaList');
  }
}
