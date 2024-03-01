import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent {
  // selectedTime: string | undefined;
  dateTimeForm: FormGroup | undefined;

  // onTimeSet(event: any) {
  //   const selectedTime = event;

  //   this.timePickerControl.setValue(selectedTime);
  // }

  //Handle formcontrol
  datePickerControl: FormControl = new FormControl('', Validators.required);
  // timePickerControl: FormControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.dateTimeForm = new FormGroup({
      datePicker: this.datePickerControl,
      // timePicker: this.timePickerControl,
    })
  }

  isControlInvalid(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  timeSelect: string = '';
}
