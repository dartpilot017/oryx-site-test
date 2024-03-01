import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-official-pictures',
  templateUrl: './official-pictures.component.html',
  styleUrls: ['./official-pictures.component.scss']
})
export class OfficialPicturesComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  officialPictures$: Observable<any> | undefined;
  displayedPictures: string[] = [];
  noMorePictures: boolean = false;
  n: number = 6;

  ngOnInit(): void {
    this.officialPictures$ = this.contentfulService.getAllEntries('officialPictures');
    this.initializeOfficialPictures();
  }

  initializeOfficialPictures(): void {
    this.officialPictures$?.subscribe((pictures: any) => {
      if (this.n > pictures['items'][0]['fields']['profileImages'].length) {
        this.noMorePictures = true;
        return;
      }
      let count: number = 0;
      this.displayedPictures = [];
      pictures['items'][0]['fields']['profileImages'].forEach((item: any) => {
        if (count >= this.n || this.noMorePictures) { return; }
        this.displayedPictures.push(item['fields']['file']['url']);
        count++;
      });
    });
  }

  loadMorePictures(): void {
    if (this.noMorePictures) { return; }
    this.n += 3;
    this.initializeOfficialPictures();
  }

  downloadImage(imageUrl: string) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = "official_picture"; // Naming the downloaded image
    link.target = '_blank'; // Open the link in a new tab/window
    document.body.appendChild(link); // Append the link to the document (hidden element)
    link.click(); // Simulate a click to trigger the download
    document.body.removeChild(link); // Clean up: remove the link from the document
  }

}
