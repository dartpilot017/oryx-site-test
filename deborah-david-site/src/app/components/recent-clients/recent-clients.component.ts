import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-recent-clients',
  templateUrl: './recent-clients.component.html',
  styleUrls: ['./recent-clients.component.scss']
})

export class RecentClientsComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  clients$: Observable<any> | undefined;

  ngOnInit(): void {
    this.clients$ = this.contentfulService.getAllEntries('clients');
  }
}

// export class RecentClientsComponent implements OnInit {
//   @Input() RecentClient: any[] = [];
//   sliderConfig: any;

//   constructor(private contentfulService: ContentfulService) { }

//   ngOnInit(): void {
//     this.fetchclients();
//   }

//   fetchclients(): void {
//     this.contentfulService.getAllEntries('Certifications & Achievements').subscribe((entries: any) => {
//       const entryArray = entries.items; // Convert EntryCollection to an array
//       this.RecentClient = entryArray.map((entry: any) => ({
//         logoUrl: entry.fields.logoUrl,
//         name: entry.fields.name
//       }));
//       this.configureSlider();
//     });
//   }

//   configureSlider(): void {
//     this.sliderConfig = {
//       slidesToShow: this.clients.length >= 4 ? 4 : this.clients.length,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 3000,
//       dots: true,
//       centerMode: true,
//       responsive: [
//         {
//           breakpoint: 768,
//           settings: {
//             slidesToShow: this.clients.length >= 2 ? 2 : this.clients.length
//           }
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: 1
//           }
//         }
//       ]
//     };
//   }
// }



