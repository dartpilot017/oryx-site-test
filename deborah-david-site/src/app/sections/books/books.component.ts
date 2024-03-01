import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  bookList$: Observable<any> | undefined;

  ngOnInit(): void {
    this.bookList$ = this.contentfulService.getAllEntries('bookList');
  }
}
