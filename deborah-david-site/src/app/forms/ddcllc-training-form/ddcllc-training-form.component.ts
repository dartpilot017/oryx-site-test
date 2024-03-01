import { Component } from '@angular/core';

@Component({
  selector: 'app-ddcllc-training-form',
  templateUrl: './ddcllc-training-form.component.html',
  styleUrls: ['./ddcllc-training-form.component.scss']
})
export class DdcllcTrainingFormComponent {

  //ddcllc-training-form validation
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  website: string = '';
  policyCheckbox: boolean = false;
}
