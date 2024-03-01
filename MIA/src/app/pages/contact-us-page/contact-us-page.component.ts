import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Button {
  text: string;
  selected: boolean;
}

interface checkBox {
  option: string;
  selected: boolean;
}

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsPageComponent {
  activeStep: number = 0;
  expandBusinessClicked = false;
  getStartedClicked = false;

  buttons: Button[] = [
    { text: 'How can we help you?', selected: true },
    { text: 'Get started with your business', selected: false },
    { text: 'Expand your Business', selected: false },
    { text: 'Get started with your business', selected: false },
    { text: 'Expand your Business', selected: false },
    { text: 'How can we help you?', selected: false },
  ];

  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  step4Form: FormGroup;
  step5Form: FormGroup;
  step6Form: FormGroup;

  checkBox = [
    { option: 'Website design', selected: false },
    { option: 'Content creation', selected: false },
    { option: 'UX design', selected: false },
    { option: 'Strategy & Counsulting', selected: false },
    { option: 'User research', selected: false },
    { option: 'Other', selected: false },
  ];

  steps = [
    {
      step: 'Step 1',
      text: 'Business Information',
    },
    {
      step: 'Step 2',
      text: 'Contact Information',
    },
    {
      step: 'Step 3',
      text: 'Service of Interest',
    },
  ];

  selectedService: any;

  showStep1Form = true;
  showStep2Form = false;
  showStep3Form = false;
  showStep4Form = true;
  showStep5Form = false;
  showStep6Form = false;

  

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {

    const selectedOptions = this.checkBox
        .filter((option) => option.selected)
        .map((option) => option.option);

    this.step1Form = this.fb.group({
      businessName: ['', Validators.required],
      industry: ['', Validators.required],
      businessType: ['', Validators.required],
      description: [''],
    });

    this.step2Form = this.fb.group({
      contactPerson: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });

    this.step3Form = this.fb.group({
      servicesInterested: selectedOptions,
      additionalComments: [''],
    });
    this.step4Form = this.fb.group({
      businessName: ['', Validators.required],
      industry: ['', Validators.required],
      businessType: ['', Validators.required],
      description: [''],
    });

    this.step5Form = this.fb.group({
      contactPerson: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });
    this.step6Form = this.fb.group({
      servicesInterested: selectedOptions,
      challengesGoals: ['', Validators.required],
      timeline: ['', Validators.required],
      additionalComments: [''],
    });
  }

  moveToStep2() {
    if (this.step1Form.valid) {
      this.activeStep = 1;
      this.showStep1Form = false;
      this.showStep2Form = true;
      this.showStep3Form = false;
    }
  }

  moveToStep3() {
    if (this.step2Form.valid) {
      this.activeStep = 2;
      this.showStep1Form = false;
      this.showStep2Form = false;
      this.showStep3Form = true;
    }
  }
  moveToStep5() {
    if (this.step4Form.valid) {
      this.activeStep = 4;
      this.showStep4Form = false;
      this.showStep5Form = true;
      this.showStep6Form = false;
    }
  }
  moveToStep6() {
    if (this.step5Form.valid) {
      this.activeStep = 5;
      this.showStep4Form = false;
      this.showStep5Form = false;
      this.showStep6Form = true;
    }
  }

  submitForm1() {
    if (this.step1Form.valid && this.step2Form.valid && this.step3Form.valid) {
      
      // Reset step visibility
      this.showStep1Form = true;
      this.showStep2Form = false;
      this.showStep3Form = false;
      
      // Reset form
      this.step1Form.reset();
      this.step2Form.reset();
      this.step3Form.reset();
      // Show snackbar
      this.openSnackBar('Form submitted successfully!');
    }
  }

  submitForm2() {
    if (this.step4Form.valid && this.step5Form.valid && this.step6Form.valid) {
      
      // Reset step visibility
      this.showStep4Form = true;
      this.showStep5Form = false;
      this.showStep6Form = false;
      
      // Reset form
      this.step4Form.reset();
      this.step5Form.reset();
      this.step6Form.reset();
      // Show snackbar
      this.openSnackBar('Form submitted successfully!');
    }
  }

  // Snackbar function
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  selectService(service: any) {
    this.selectedService = service;
  }

  onButtonClick(selectedButton: Button) {
    this.buttons.forEach((btn) => (btn.selected = false));
    selectedButton.selected = true;
  }
}
