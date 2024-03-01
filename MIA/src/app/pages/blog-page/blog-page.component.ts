import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent {
  @ViewChild('icon1')
  icon1!: ElementRef;
  @ViewChild('icon2') icon2!: ElementRef;
  @ViewChild('icon3') icon3!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.displayIconsSequentially();
  }

  displayIconsSequentially() {
    const icon1 = this.icon1.nativeElement;
    const icon2 = this.icon2.nativeElement;
    const icon3 = this.icon3.nativeElement;

    this.renderer.setStyle(icon1, 'display', 'block');
    this.renderer.setStyle(icon2, 'display', 'none');
    this.renderer.setStyle(icon3, 'display', 'none');

    setTimeout(() => {
      this.renderer.setStyle(icon1, 'display', 'none');
      this.renderer.setStyle(icon2, 'display', 'block');
      this.renderer.setStyle(icon3, 'display', 'none');
    }, 3000);

    setTimeout(() => {
      this.renderer.setStyle(icon1, 'display', 'none');
      this.renderer.setStyle(icon2, 'display', 'none');
      this.renderer.setStyle(icon3, 'display', 'block');
    }, 6000);

    setTimeout(() => {
      this.renderer.setStyle(icon1, 'display', 'none');
      this.displayIconsSequentially();
    }, 8000);
  }
}
