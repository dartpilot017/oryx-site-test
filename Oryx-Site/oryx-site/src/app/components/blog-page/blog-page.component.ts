// blog-page.component.ts
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  email: string = '';
  message: string = '';
  isEnglish!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private snackBar: MatSnackBar, private languageService: LanguageService) {}
  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish: boolean) => {
      this.isEnglish = isEnglish;
    });
  }

  onnewsLetterDetails(newsLetterForm: any): void {
    if (newsLetterForm.valid && this.isEmailValid(this.email)) {
      const newsLetter = {
        email: this.email,
        message: this.message,
      };

      this.http.post('https://apptools.oryxhr.com/api/newsletter', newsLetter)
        .subscribe(() => {
          this.snackBar.open('Form submitted successfully!', 'Close', {
            duration: 5000,
          });
          this.email = '';
          this.message = '';
          newsLetterForm.resetForm();
        });
    }
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
