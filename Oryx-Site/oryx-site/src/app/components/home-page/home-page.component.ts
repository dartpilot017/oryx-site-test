import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { YoutubePopUpComponent } from '../youtube-pop-up/youtube-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isEnglish!: boolean;
  constructor(
    private contentfulService: ContentfulService,
    private router: Router,
    private dialog: MatDialog,
    private LanguageService: LanguageService
  ) {}

  oryxHomePage$: Observable<any> | undefined;

  ngOnInit(): void {
    this.oryxHomePage$ = this.contentfulService.getAllEntries('homePage');
    this.LanguageService.isEnglish$.subscribe((isEnglish: boolean) => {
      this.isEnglish = isEnglish;
      this.initializeHomePage();
    
    })
  }

  initializeHomePage(): void {
    if (this.isEnglish) {
      this.oryxHomePage$ = this.contentfulService.getAllEntries('homePage');
    } else {
      this.oryxHomePage$ = this.contentfulService.getAllEntries(
        'homePage',
        'fr'
      );
    }
  }

  redirectToContactUs() {
    this.router.navigate(['/contact-us']);
  }

  openDialog() {
    this.dialog.open(YoutubePopUpComponent);
  }
}
