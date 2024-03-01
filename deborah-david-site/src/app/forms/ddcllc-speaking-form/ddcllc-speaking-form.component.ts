import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ddcllc-speaking-form',
  templateUrl: './ddcllc-speaking-form.component.html',
  styleUrls: ['./ddcllc-speaking-form.component.scss']
})
export class DdcllcSpeakingFormComponent {
  [x: string]: any;

  socialMediaError: string = '';
  organizationLocationError: string = '';

  handleSocialMediaError(errorMessage: string): void {
    this.socialMediaError = errorMessage;
  }

  handleOrganizationLocationError(errorMessage: string): void {
    this.organizationLocationError = errorMessage;
  }

  validateOrganizationLocation() {
    this['organizationLocationComponent'].emitErrorMessage();
  }

  //ddcllc-training-form validation
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  topic: string = '';
  policyCheckbox: boolean = false;

}
