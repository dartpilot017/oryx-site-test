import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, finalize } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-service-nav-bar',
  templateUrl: './service-nav-bar.component.html',
  styleUrls: ['./service-nav-bar.component.scss']
})
export class ServiceNavBarComponent {
  constructor(private contentfulservice: ContentfulService) { }

  dropdownContent$: Observable<any> | undefined;

  ngOnInit(): void {
    this.dropdownContent$ = this.contentfulservice.getAllEntries('dropdownContent');
  }

}