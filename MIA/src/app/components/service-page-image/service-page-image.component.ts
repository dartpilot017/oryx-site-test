import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-service-page-image',
  templateUrl: './service-page-image.component.html',
  styleUrls: ['./service-page-image.component.scss']
})
export class ServicePageImageComponent {
  products$: Observable<any> | undefined;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.products$ = this.contentfulService.getAllEntries('products');
  }
}
