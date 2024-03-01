import { Component } from '@angular/core';

interface Button {
  text: string;
  selected: boolean;
}

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent {
  buttons: Button[] = [
    { text: 'books', selected: true },
    { text: 'podcast', selected: false }
  ];

  constructor() { }

  onButtonClick(selectedButton: Button) {
    this.buttons.forEach(btn => btn.selected = false);
    selectedButton.selected = true;
  }
}
