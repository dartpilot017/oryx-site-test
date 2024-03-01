import { Component } from '@angular/core';

@Component({
  selector: 'app-coaching-form',
  templateUrl: './coaching-form.component.html',
  styleUrls: ['./coaching-form.component.scss']
})
export class CoachingFormComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  occupation: string = '';
  experience: string = '';
  topic: string = '';
  policyCheckbox: boolean = false;
}
