import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { NgModel } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.scss']
})
export class ContactUsPageComponent implements OnInit {
  isEnglish! : boolean;
  
  constructor(private contentfulService: ContentfulService, private http: HttpClient, private snackBar: MatSnackBar, private languageService: LanguageService) { }

  @ViewChild('firstNameInput') firstNameInput!: NgModel;
  @ViewChild('lastNameInput') lastNameInput!: NgModel;
  @ViewChild('emailInput') emailInput!: NgModel;
  @ViewChild('phoneInput') phoneInput!: NgModel;
  @ViewChild('companyInput') companyInput!: NgModel;
  @ViewChild('contactModeInput') contactModeInput!: NgModel;
  @ViewChild('selectedServiceInput') selectedServiceInput!: NgModel;
  @ViewChild('messageInput') messageInput!: NgModel;
  @ViewChild('policyInput') policyInput!: NgModel;

  onContactUsDetails(
    contactUs: {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    company: string,
    contactMode: string,
    selectedService: string,
    message: string,
    policyCheckbox: boolean
  }){
    console.log(contactUs);
    this.http.post('https://apptools.oryxhr.com/api/contact', contactUs)
    .subscribe((res) => {
      console.log(res);
    });
    this.snackBar.open('Form submitted successfully!', 'Close', {
      duration: 5000,
    })
    this.resetForm();
  }

  contactUsPage$: Observable<any> | undefined;

  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe(
      (isEnglish: boolean) => {
        this.isEnglish = isEnglish;
        if (this.isEnglish) {
          this.contactUsPage$ = this.contentfulService.getAllEntries('contactUsPage');
        } else {
          this.contactUsPage$ = this.contentfulService.getAllEntries('contactUsPage', 'fr');
        }
      }
    );
  }

  // handling form validation
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  companyName: string = '';
  contactMode: string = '';
  selectedService: string = '';
  message: string = '';
  policyCheckbox: boolean = false;

  resetForm(){
    this.firstNameInput.reset();
    this.lastNameInput.reset();
    this.emailInput.reset();
    this.phoneInput.reset();
    this.companyInput.reset();
    this.contactModeInput.reset();
    this.selectedServiceInput.reset();
    this.messageInput.reset();
    this.policyInput.reset();

    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.companyName = '';
    this.contactMode = '';
    this.selectedService = '';
    this.message = '';
    this.policyCheckbox = false;
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  isPhoneNumValid(phoneNum: string): boolean {
    const phoneNumPattern = /^\d{11}$/;
    return phoneNumPattern.test(phoneNum);
  }

  isButtonDisabled(): boolean {
    return !this.firstName || !this.lastName || !this.email || !this.phoneNumber || !this.companyName || !this.contactMode || !this.selectedService || !this.message || !this.policyCheckbox || !this.isEmailValid(this.email) || !this.isPhoneNumValid(this.phoneNumber);
  }
}
