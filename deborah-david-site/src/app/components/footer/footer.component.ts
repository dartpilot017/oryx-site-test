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
    { name: 'instagram', file: 'instagram-white.png' },
    { name: 'youtube', file: 'youtube-white.png' },
    { name: 'tiktok', file: 'tiktok-white.png' },
    { name: 'facebook', file: 'facebook-white.png' },
    { name: 'twitter', file: 'twitter-white.png' },
    { name: 'linkedin', file: 'linkedin-white.png'}
  ];

  contactInfo$: Observable<any> | undefined;

  ngOnInit(): void {
    this.contactInfo$ = this.contentfulService.getAllEntries('contactInfo');
  }
}
