import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';


@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.scss']
})
export class ProductNavBarComponent implements OnInit {
  constructor(private contentfulservice: ContentfulService) { }

  dropdownContent$: Observable<any> | undefined;

  ngOnInit(): void {
    this.dropdownContent$ = this.contentfulservice.getAllEntries('dropdownContent');
  }
}
