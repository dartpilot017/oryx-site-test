import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-you-tube-section',
  templateUrl: './you-tube-section.component.html',
  styleUrls: ['./you-tube-section.component.scss']
})
export class YouTubeSectionComponent implements OnInit {
  @ViewChild("iframe", { static: false })
  iframe!: ElementRef;
  
  constructor(private contentfulService: 
    ContentfulService, 
    private sanitizer: DomSanitizer,
    ) { }

  youtubeSection$: Observable<any> | undefined;

  ngOnInit(): void {
    this.youtubeSection$ = this.contentfulService.getAllEntries('youtubeSection');
  }

  getYouTubeVideoUrl(videoId: string): string {
    return 'https://www.youtube.com/embed/' + videoId;
  }

}

@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
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
