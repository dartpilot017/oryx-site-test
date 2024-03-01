import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-certifications-accomplishments',
  templateUrl: './certifications-accomplishments.component.html',
  styleUrls: ['./certifications-accomplishments.component.scss']
})

export class CertificationsAccomplishmentsComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) { }

  certificationsAndAchievements$: Observable<any> | undefined;

  ngOnInit(): void {
    this.certificationsAndAchievements$ = this.contentfulService.getAllEntries('certificationsAndAchievements');
  }
}

// export class CertificationsAccomplishmentsComponent implements OnInit {
//   @Input() CertificationsAccomplishments: any[] = [];
//   sliderConfig: any;

//   constructor(private contentfulService: ContentfulService) { }

//   ngOnInit(): void {
//     this.fetchCertificationsAccomplishments();
//   }

//   fetchCertificationsAccomplishments(): void {
//     this.contentfulService.getAllEntries('Certifications & Achievements').subscribe((entries: any) => {
//       const entryArray = entries.items; // Convert EntryCollection to an array
//       this.CertificationsAccomplishments = entryArray.map((entry: any) => ({
//         logoUrl: entry.fields.logoUrl,
//         name: entry.fields.name
//       }));
//       this.configureSlider();
//     });
//   }

//   configureSlider(): void {
//     this.sliderConfig = {
//       slidesToShow: this.CertificationsAccomplishments.length >= 4 ? 4 : this.CertificationsAccomplishments.length,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 3000,
//       dots: true,
//       centerMode: true,
//       responsive: [
//         {
//           breakpoint: 768,
//           settings: {
//             slidesToShow: this.CertificationsAccomplishments.length >= 2 ? 2 : this.CertificationsAccomplishments.length
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



