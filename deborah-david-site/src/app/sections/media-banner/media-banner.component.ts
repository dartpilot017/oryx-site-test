import { Component } from '@angular/core';

@Component({
  selector: 'app-media-banner',
  templateUrl: './media-banner.component.html',
  styleUrls: ['./media-banner.component.scss']
})
export class MediaBannerComponent {
  quote: string = "Whatever you are looking for is in the hands of someone. Man was made for interaction.";
  author: string = "Deborah David";
  titles: string[] = ["Thought Speaker", "Author", "Speaker", "Executive Coach"];
}
