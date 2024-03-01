import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-pop-up',
  templateUrl: './email-pop-up.component.html',
  styleUrls: ['./email-pop-up.component.scss']
})
export class EmailPopUpComponent implements OnInit {

  email: string = '';
  message: string = '';
  isPopUpVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isPopUpVisible = true;
      }, 120000); // 120000 milliseconds = 2 minutes
    }
  }

  closeContainer(): void { this.isPopUpVisible = false; }

  onnewsLetterDetails(
    newsLetter: {
    email: string,
    message: string,
  }){
    // console.log(newsLetter);
    this.http.post('https://apptools.oryxhr.com/api/newsletter', newsLetter)
    this.snackBar.open('Form submitted successfully!', 'Close', {
      duration: 5000,
    })
    this.email = '';
    this.message = '';
    this.closeContainer();
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  isButtonDisabled(): boolean {
    return !this.isEmailValid(this.email);
  }
}
