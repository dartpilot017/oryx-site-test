import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { DemoRequestButtonComponent } from 'src/app/buttons/demo-request-button/demo-request-button.component';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<any> | undefined;
  slideCount: number = 0;
  activeSlideIndex: number = 0;
  swipeStartX: number | null = null;
  swipeEndX: number | null = null;
  backgroundColor: string[] = [];

  constructor(
    private contentfulService: ContentfulService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = this.contentfulService.getAllEntries('products');
    this.products$.subscribe((data) => {
      this.slideCount = data.items[0].fields.productsMedia.length;
      this.autoSlide();
    });
  }

  autoSlide() {
    setInterval(() => {
      this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slideCount;
    }, 300000000);
  }

  setActiveSlide(index: number): void {
    this.activeSlideIndex = index;
  }

  isSlideActive(index: number): boolean {
    return this.activeSlideIndex === index;
  }

  onSwipeStart(event: MouseEvent) {
    this.swipeStartX = event.clientX;
  }

  onSwipeMove(event: MouseEvent) {
    if (this.swipeStartX !== null) {
      this.swipeEndX = event.clientX;
    }
  }

  onSwipeEnd() {
    if (this.swipeStartX !== null && this.swipeEndX !== null) {
      const deltaX = this.swipeEndX - this.swipeStartX;
      if (deltaX > 50) {
        // Swipe right
        this.activeSlideIndex =
          (this.activeSlideIndex - 1 + this.slideCount) % this.slideCount;
      } else if (deltaX < -50) {
        // Swipe left
        this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slideCount;
      }

      this.swipeStartX = null;
      this.swipeEndX = null;
    }
  }

  openDialog() {
    this.dialog.open(DemoRequestButtonComponent);
  }
}
