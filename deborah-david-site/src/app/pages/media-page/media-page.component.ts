import { Component } from '@angular/core';

interface Button {
  text: string;
  selected: boolean;
}

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss']
})
export class MediaPageComponent {
  buttons: Button[] = [
    { text: 'Qoutes', selected: true },
    { text: 'Gallery', selected: false }
  ];

  constructor() { }

  onButtonClick(selectedButton: Button) {
    this.buttons.forEach(btn => btn.selected = false);
    selectedButton.selected = true;
  }
}
