import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

interface Icon {
  name: string;
  file: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  icons: Icon[] = [
    { name: 'twitter', file: 'twitter-icon.svg'},
    { name: 'instagram', file: 'instagram-icon.svg' },
    { name: 'linkedin', file: 'linkedin-icon.svg'}
  ];

  footer$: Observable<any> | undefined;

  ngOnInit(): void {
    this.footer$ = this.contentfulService.getAllEntries('footer')
  }
}
