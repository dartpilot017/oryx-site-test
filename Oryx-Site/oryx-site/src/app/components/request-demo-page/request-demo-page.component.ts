import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { NgModel } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-request-demo-page',
  templateUrl: './request-demo-page.component.html',
  styleUrls: ['./request-demo-page.component.scss']
})
export class RequestDemoPageComponent implements OnInit {
  constructor(private contentfulService: ContentfulService, private http: HttpClient, private snackBar: MatSnackBar, private languageService: LanguageService) { }

  requestDemo$: Observable<any> | undefined;
  allProducts: string[] = [];
  isEnglish!: boolean;

  @ViewChild('nameInput') nameInput!: NgModel;
  @ViewChild('emailInput') emailInput!: NgModel;
  @ViewChild('phoneInput') phoneInput!: NgModel;
  @ViewChild('companyInput') companyInput!: NgModel;

  onRequestDemoDetails(
    requestDemo: {
    name: string,
    email: string,
    phone: string,
    company: string,
    message: string,
    selectedProducts: [],
    policyCheckbox: boolean
  }){
    console.log(requestDemo);
    this.http.post('https://apptools.oryxhr.com/api/demo', requestDemo)
    .subscribe((res) => {
      console.log(res);
    });
    this.snackBar.open('Form submitted successfully!', 'Close', {
      duration: 5000,
    })
    this.resetForm();
  }

  ngOnInit(): void {
    
    this.languageService.isEnglish$.subscribe((isEnglish: boolean) => {
      this.isEnglish = isEnglish;
      
      if (this.isEnglish) {
        this.requestDemo$ = this.contentfulService.getAllEntries('requestDemo');
      } else {
        this.requestDemo$ = this.contentfulService.getAllEntries('requestDemo', 'fr');
      }
    });
  }


  // handling form validation
  name: string = '';
  email: string = '';
  phone: string = '';
  company: string = '';
  message: string = '';
  selectedProducts: string[] = [];

  formFields: {id:string, fr:string, type:string, index:number, variable:any}[] = [
    {id:'name', fr: 'Nom', type:'text', index:0, variable:this.name},
    {id:'email', fr: 'e-mail', type:'email', index:1, variable:this.email},
    {id:'phone', fr:'téléphone',  type:'tel', index:2, variable:this.phone},
    {id:'company', fr: 'entreprise',  type:'text', index:3, variable:this.company}
  ]

  resetForm(): void {
    this.nameInput.reset();
    this.emailInput.reset();
    this.phoneInput.reset();
    this.companyInput.reset();

    this.name = '';
    this.email = '';
    this.phone = '';
    this.message = '';
    this.selectedProducts = [];
  }

  selectProduct(product: string, event: any): void {
    if (event.target.checked){
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter((item) => item !== product);
    }
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  isPhoneNumValid(phoneNum: string): boolean {
    const phoneNumPattern = /^\d{11}$/;
    return phoneNumPattern.test(phoneNum);
  }

  isProductSelected(): boolean {
    for (let i = 0; i < this.selectedProducts.length; i++){
      if (this.selectedProducts[i]){ return true; }
    }
    return false;
  }

  isButtonDisabled(): boolean {
    return this.name === '' || !this.isEmailValid(this.email) || !this.isPhoneNumValid(this.phone) || this.company === '' || !this.isProductSelected();
  }
}
