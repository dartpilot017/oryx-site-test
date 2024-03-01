import { Component, ElementRef, HostListener, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ContentfulService } from 'src/app/services/contentful.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-pop-up',
  templateUrl: './youtube-pop-up.component.html',
  styleUrls: ['./youtube-pop-up.component.scss']
})
export class YoutubePopUpComponent implements OnInit {
  showPopup = false;
  @ViewChild("iframe", { static: false })
  iframe!: ElementRef;

  // handling pop up visibility
  isPopUpVisible = true;

  constructor(
    private contentfulService: ContentfulService,
    private sanitizer: DomSanitizer
  ) { }

  oryxHomePage$: Observable<any> | undefined;

  ngOnInit() {

    this.oryxHomePage$ = this.contentfulService.getAllEntries('homePage');
  }

  getYouTubeVideoUrl(videoId: string): string {
    return 'https://www.youtube.com/embed/' + videoId;
  }

  closeContainer() {
    this.isPopUpVisible = false;
  }
}

@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }

  transform(
    value: string,
    type: string
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case "html":
        return this._sanitizer.bypassSecurityTrustHtml(value);
      case "style":
        return this._sanitizer.bypassSecurityTrustStyle(value);
      case "script":
        return this._sanitizer.bypassSecurityTrustScript(value);
      case "url":
        return this._sanitizer.bypassSecurityTrustUrl(value);
      case "resourceUrl":
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}
