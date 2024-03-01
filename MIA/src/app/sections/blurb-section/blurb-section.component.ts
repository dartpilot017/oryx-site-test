import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-blurb-section',
  templateUrl: './blurb-section.component.html',
  styleUrls: ['./blurb-section.component.scss']
})
export class BlurbSectionComponent {
  products$: Observable<any> | undefined;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.products$ = this.contentfulService.getAllEntries('products');
  }
}
