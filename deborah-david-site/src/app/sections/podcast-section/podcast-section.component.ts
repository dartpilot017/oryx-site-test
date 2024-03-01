import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast-section.component.html',
  styleUrls: ['./podcast-section.component.scss']
})
export class PodcastSectionComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  podcast$: Observable<any> | undefined;

  ngOnInit(): void {
    this.podcast$ = this.contentfulService.getAllEntries('podcast');
  }

}


