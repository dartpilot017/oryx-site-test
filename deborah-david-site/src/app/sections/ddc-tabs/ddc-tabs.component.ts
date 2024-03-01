import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

interface Button {
  text: string;
  selected: boolean;
}

@Component({
  selector: 'app-ddc-tabs',
  templateUrl: './ddc-tabs.component.html',
  styleUrls: ['./ddc-tabs.component.scss']
})
export class DDCTabsComponent implements OnInit {
  buttons: Button[] = [
    { text: 'Consulting', selected: true },
    { text: 'Business and Financial Support', selected: false },
    { text: 'Audit Support', selected: false },
    { text: 'Manpower Support', selected: false },
    { text: 'Outsourcing', selected: false }
  ];

  constructor(private contentfulService: ContentfulService) { }

  ddcTabs$: Observable<any> | undefined;

  ngOnInit(): void {
    this.ddcTabs$ = this.contentfulService.getAllEntries('ddcTabs');
  }

  onButtonClick(selectedButton: Button) {
    this.buttons.forEach(btn => btn.selected = false);
    selectedButton.selected = true;
  }
}
