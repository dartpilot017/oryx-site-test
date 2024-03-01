import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

interface Button {
  text: string;
  selected: boolean;
}

@Component({
  selector: 'app-ddcllc-tabs',
  templateUrl: './ddcllc-tabs.component.html',
  styleUrls: ['./ddcllc-tabs.component.scss']
})
export class DDCLLCTabsComponent implements OnInit {
  buttons: Button[] = [
    { text: 'Speaking', selected: true },
    { text: 'Executive Coaching', selected: false },
    { text: 'Training', selected: false },
    { text: 'SEIP Testing', selected: false }
  ];

  constructor(private contentfulService: ContentfulService) { }

  ddcllcTabs$: Observable<any> | undefined;

  ngOnInit(): void {
    this.ddcllcTabs$ = this.contentfulService.getAllEntries('ddcllcTabs');
  }

  onButtonClick(selectedButton: Button) {
    this.buttons.forEach(btn => btn.selected = false);
    selectedButton.selected = true;
  }

  openWebsite(): void {
    const url = 'https://flutterwave.com/pay/jilnqitdfgii';
    window.open(url, '_blank');
  }
}
