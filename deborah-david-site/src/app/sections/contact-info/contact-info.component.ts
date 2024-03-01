import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

interface Icon {
  name: string;
  file: string;
}

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  icons: Icon[] = [
    { name: 'instagram', file: 'instagram-black.png' },
    { name: 'youtube', file: 'youtube-black.png' },
    { name: 'facebook', file: 'facebook-black.png' },
    { name: 'twitter', file: 'twitter-black.png' },
    { name: 'linkedin', file: 'linkedin-black.png' }
  ];

  contactInfo$: Observable<any> | undefined;

  ngOnInit(): void {
    this.contactInfo$ = this.contentfulService.getAllEntries('contactInfo');
  }
}
