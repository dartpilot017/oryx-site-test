import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

interface Button {
  text: string;
  selected: boolean;
}

@Component({
  selector: 'app-expressions-tabs',
  templateUrl: './expressions-tabs.component.html',
  styleUrls: ['./expressions-tabs.component.scss']
})
export class ExpressionsTabsComponent implements OnInit {
  buttons: Button[] = [
    { text: 'Empowerment Foundation', selected: true },
    { text: 'Workplace Channel', selected: false }
  ];

  reasons: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];

  constructor(private contentfulService: ContentfulService) { }

  expressionsTabs$: Observable<any> | undefined;

  ngOnInit(): void {
    this.expressionsTabs$ = this.contentfulService.getAllEntries('expressionsTabs');
  }

  onButtonClick(selectedButton: Button) {
    this.buttons.forEach(btn => btn.selected = false);
    selectedButton.selected = true;
  }

  sendEmail(): void {
    window.location.href = 'mailto:ddcllconsulting@gmail.com?subject=Your%20Subject&body=Your%20Message%20Goes%20Here';
  }
}
