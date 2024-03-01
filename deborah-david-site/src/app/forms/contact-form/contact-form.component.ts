import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  reason: string = '';
  additionalInfo: string = '';
  policyCheckbox: boolean = false;
}
