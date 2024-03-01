import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  about$: Observable<any> | undefined;

  ngOnInit(): void {
    this.about$ = this.contentfulService.getAllEntries('about');
  }
}
