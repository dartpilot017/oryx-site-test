import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo-request-form',
  templateUrl: './demo-request-form.component.html',
  styleUrls: ['./demo-request-form.component.scss']
})
export class DemoRequestFormComponent implements OnInit {
  demoForm!: FormGroup;
  firstName: string = '';
  lastName: string = '';
  cName: string = '';
  cWeb: string = '';
  bEmail: string = '';
  bCategory: string = '';
  country: string = '';
  phone: string = '';
  eSize: string = '';
  sProduct: string = '';

  constructor(private fb: FormBuilder) {}
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.demoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cName: ['', Validators.required],
      cWeb: ['', Validators.required],
      bEmail: ['', [Validators.required, Validators.email]],
      // bCategory: ['', Validators.required],
      // country: ['', Validators.required],
      // eSize: ['', Validators.required],
      sProduct: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.demoForm.valid) {
      // Close the card or do any other required actions
      this.formSubmitted.emit();
    } else {
      // Mark all form controls as touched to display error messages
      this.markAllControlsAsTouched(this.demoForm);
    }
  }

  markAllControlsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markAllControlsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
