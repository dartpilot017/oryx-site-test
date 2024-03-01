import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'oryx-site';
  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.loadingService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.cdr.detectChanges(); // Manually trigger change detection to prevent NG0100 error
    });
  }
}
